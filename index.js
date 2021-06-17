require('dotenv').config()
const Discord = require('discord.js')
const { exec } = require("child_process")

const client = new Discord.Client() // create client
client.on('ready', () => {
  console.log('Ready')
  client.user.setPresence({
    activity: { type: process.env.ACT_TYPE, name: process.env.ACT_NAME }, status: process.env.STATUS
  })
})
client.login(process.env.TOKEN)

function execute(command, channel) {
  exec(command, (err, stdout, stderr) => {
    if (err) return channel.send(`error: ${err.message}`)
    if (stderr) return channel.send(`stderr: ${stderr}`)
    channel.send('```'+stdout+'```')
  })
}

client.on('message', message => {
  const prefix = process.env.PREFIX 
  if (!message.author.bot && message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase()
    if (command === 'wol') execute(`wol ${process.env.MAC}`, message.channel)
    else if (command === 'ip') execute("ip -4 a", message.channel)
    else if (command === 'ping') execute(`ping -c 5 ${process.env.IP}`, message.channel)
    else message.channel.send('wol | ip | ping')
}})
