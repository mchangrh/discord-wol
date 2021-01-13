// imports
require('dotenv').config()
const Discord = require('discord.js')
const { exec, spawn } = require("child_process")

const client = new Discord.Client() // create client
client.on('ready', () => {
  console.log('Ready')
  client.user.setPresence({ // set presence
    activity: { type: process.env.ACT_TYPE, name: process.env.ACT_NAME },
    status: process.env.STATUS
  })
})
client.login(process.env.TOKEN) // login

client.on('message', message => {
  const prefix = process.env.PREFIX // set prefix
  if (!message.author.bot && message.content.startsWith(prefix)) { // check if sent by self & check for prefix
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase()
    // run appropiate command
    if (command === 'wol') { // set map
        exec(`wol ${process.env.MAC}`, (error, stdout, stderr) => {
            if (error) {
                message.channel.send(`error: ${error.message}`)
                return;
            }
            if (stderr) {
                message.channel.send(`stderr: ${stderr}`)
                return
            }
            message.channel.send(`\`\`\`${stdout}\`\`\``)
        })
    } else if (command === 'ip') {
        exec("ip -4 a", (error, stdout, stderr) => {
            if (error) {
                message.channel.send(`error: ${error.message}`)
                return
            }
            if (stderr) {
                message.channel.send(`stderr: ${stderr}`)
                return
            }
            message.channel.send(`${stdout}`)
        }); 
    } else if (command === 'ping') {
        exec(`ping -c 5 ${process.env.IP}`, (error, stdout, stderr) => {
            if (error) {
                message.channel.send(`error: ${error.message}`)
                return
            }
            if (stderr) {
                message.channel.send(`stderr: ${stderr}`)
                return
            }
            message.channel.send(`${stdout}`)
        }); 
    } else { 
        message.channel.send('wol | ip | ping')
    }
}})
