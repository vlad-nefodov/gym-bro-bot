import { Composer, Bot as GrammyBot } from 'grammy';

import BaseContext from './types/BaseContext';
import { IConfiguration } from './helpers/Configuration';

export default class Bot<C extends BaseContext = BaseContext> {
  private readonly _bot: GrammyBot<C>;

  constructor(
    private readonly configuration: IConfiguration,
    private readonly middlewareComposer: Composer<C>,
    private readonly callbackQueryComposer: Composer<C>,
    private readonly commandComposer: Composer<C>
  ) {
    this._bot = new GrammyBot<C>(this.configuration.get('BOT_API_TOKEN'));

    this._bot.use(this.middlewareComposer);
    this._bot.use(this.callbackQueryComposer);
    this._bot.use(this.commandComposer);
  }

  async start(): Promise<void> {
    await this._bot.start();
  }
}