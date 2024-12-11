import { Context, SessionFlavor } from "grammy"
import { type ConversationFlavor } from "@grammyjs/conversations";
import ISettingsFlavor from "./ISettingsFlavor";
import ISessionData from "./ISessionData";

type BaseContext =
  Context &
  ISettingsFlavor &
  SessionFlavor<ISessionData> &
  ConversationFlavor;

export default BaseContext;