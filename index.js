const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const client = new Discord.Client();
const prefix = 's!'
const lastSendTime = {}
const keikoku = {}

client.on('message', async msg => {
    if (msg.author.bot) return
    const [command, ...args] = msg.content.slice(prefix.length).split(" ")
    if(lastSendTime[msg.channel.id]){if(Date.now()-lastSendTime[msg.channel.id][msg.author.id]<=500){if(keikoku[msg.author.id]){if(keikoku[msg.author.id]==20)return message.member.roles.add("691981257080307712"),msg.reply("Since we detected a lot of spam, we gave it a warning role.\nPlease contact admin for inquiries");keikoku[msg.author.id]=keikoku[msg.author.id]+1}else keikoku[msg.author.id]=1;return msg.reply("stop spaming")}lastSendTime[msg.channel.id][msg.author.id]=Date.now()}else lastSendTime[msg.channel.id]={},lastSendTime[msg.channel.id][msg.author.id]=Date.now()
    if (!msg.content.startsWith('s!')) return
    if (command === 'fetch') {
        if(keikoku[args[0]])msg.channel.send(`Number of warnings for id\`${args[0]}\`:${keikoku[args[0]]}`)
        else msg.channel.send(`id\`${args[0]}\` has not been warned yet`)
    }else if(command === "ban"){
      if (!msg.member.hasPermission('BAN_MEMBERS')) return msg.channel.send('You do not have permission to ban')
      await msg.channel.send('yes か no を送信してください')
      const filter = msg => msg.author.id === msg.author.id
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: 10000 })
      const response = collected.first()
      if (!response) return msg.channel.send('time out')
      if (!['yes', 'no',"y","n"].includes(response.content)) return msg.channel.send('The command syntax is incorrect')
      if(response.content=="yes"||response.content=="y"){
        if (msg.mentions.members.size !== 1)return msg.channel.send('Please specify one member to ban')
        const member = msg.mentions.members.first()
        await member.ban()
        msg.channel.send("ban worked fine")
        client.channels.cache.get('795289097404547082').send(`banned by ${msg.author.id}`)
      }else if(response.content=="no"||response.content=="n"){
        msg.channel.send("ban canceled")
      }
    }
})

client.on('guildMemberAdd', member => {
  client.channels.cache.get('685745207525769255').send(`${member.displayName} has joined the discord group`)
})
//685745207525769255
client.on('guildMemberRemove', member => {
  client.channels.cache.get('705331886490255420').send(`${member.displayName} has left the discord group`)
})

client.on('voiceStateUpdate', (oldState, newState) => {
  if (!oldState.channel && newState.channel){
  if(newState.member.nickname)client.channels.cache.get('796005924954308639').send(`\`${newState.member.nickname}\` has joined the ${newState.channel.name} channel`)
  else client.channels.cache.get('796005924954308639').send(`\`${newState.member.displayName}\` has joined the ${newState.channel.name} channel`)
  }
  if (oldState.channel && !newState.channel){
  if(oldState.member.nickname)client.channels.cache.get('796005924954308639').send(`\`${oldState.member.nickname}\` has left the ${oldState.channel.name} channel`)
  else client.channels.cache.get('796005924954308639').send(`\`${oldState.member.displayName}\` has left the ${oldState.channel.name} channel`)
  }
})
