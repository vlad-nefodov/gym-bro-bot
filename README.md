# [Gymmy the gnome](https://t.me/GymmyGnomeBot) 🏋️‍♂️💬  

This repository hosts the source code for **Telegram [@GymmyGnomeBot](https://t.me/GymmyGnomeBot)**, your ultimate workout companion. Designed to help you track exercises, monitor progress, and stay motivated, this bot is built using the [grammY](https://grammy.dev/) framework and leverages MongoDB for session storage.

## Features 🚀  
- **➕ Add Exercises**: Create and track your custom exercises.  
- **📝 Track Progress**: Monitor weight changes and exercise history over time.  
- **💪 Update Weights**: Easily adjust your current weights for any exercise.  
- **🔍 And Much More**: Explore features to keep your workouts on track!

## Tech Stack 🛠️  
- **Language**: TypeScript  
- **Framework**: [grammY](https://grammy.dev/) for Telegram bot development  
- **Database**: MongoDB for session persistence  
- **Conversations**: Built with the [grammY Conversations](https://github.com/grammyjs/conversations) plugin  

## How It Works 💡  
The bot supports dynamic commands and interactive conversations to make managing your workouts simple and engaging:  
1. **Commands**:  
   - `/start` – Start using the bot.  
   - `/add` – Add a new exercise.  
   - `/list` – View all exercises.  
   - `/help` – Get detailed instructions.  
2. **Interactive Callbacks**:  
   - Select, edit, or delete exercises.  
   - Adjust weights dynamically using callback buttons.  

## Example Usage 👇  
### Add a New Exercise:  
The bot will guide you to enter:  
- Exercise name  
- Starting weight  

### Update Exercise Weight:  
- Select the exercise from the list.  
- Enter the new weight.  
- The bot confirms the update with progress tracking.
