---
title: Hosting a Minecraft Server on AWS
date: September 15, 2024
summary: How to set up a low effort, highly available, low cost Minecraft server for your friends to play on.
---
# Hosting a Minecraft Server on AWS
*September 15, 2024*

It’s that time of year again. Your friends run out of things to do and someone throws out the idea to play Minecraft. If you are like me, you have the last five servers saved somewhere in your computer but they are from a year ago. Outdated version, new router to port-forward, new IP address to share. My friends don't miss the opportunity to remind me about the latency between New York and California.

Although Minecraft Realms and third party hosting services have gotten incredibly cheap, the lack of total control to add mods, use optimized servers like PaperMC, or even assigning a fixed server URL are serious pains. Having to agree to a monthly subscription that makes me responsible for killing the server breaks the camel's back.

I decided to find a way to set up a server with three priorities:
- No subscriptions
- Available at all times
- Performant

This started my investigation into hosting a game server on AWS.

## EC2 with Usage-Based Billing

The server runs on an AWS EC2 instance. The key to cost optimization lies in understanding how EC2 instances are billed. You are not charged for a stopped EC2 instance. We can configure the server to shut down when not in use, drastically reducing idle time costs. A simple CloudWatch alarm on the EC2 instance monitoring network activity suffices. If no network packets are detected for a defined period of time (e.g. 30 minutes), the alarm triggers an action to stop the EC2 instance. When the last person disconnects from the server, it'll automatically shut down.

## On-Demand Power-Up

A stopped server is useless to my friends. We need to create a switch that can turn on the server. A simple Lambda function is capable of starting an EC2 instance and costs practically nothing. The problem is, my friends can’t do anything with this Lambda. A simple button on a website can remove the complexity of a CURL request, but I’m not so confident about exposing this endpoint to the public.

After some thought, I realized all of my friends are already in a private server on Discord. A [Discord slash command](https://support-apps.discord.com/hc/en-us/articles/26501837786775-Slash-Commands-FAQ) is a great way to address both security and accessibility. A /start-minecraft command can be registered directly with Discord’s API. When a user types the command, Discord will send a secure request to Amazon API Gateway which triggers the Lambda function to start the server. 

For a deeper dive into setting up a Discord bot with AWS Lambda and API Gateway for slash commands, this README is a great resource: [AWS Lambda Discord Bot](https://github.com/ker0olos/aws-lambda-discord-bot).

### The IPv4 Problem and the IPv6 Solution

A crucial hurdle in hosting game servers is the IP address. When an EC2 instance is stopped and then restarted, it receives a new public IPv4 address. This makes it difficult to reliably save a server to your game client.

AWS offers Elastic IPs (EIPs) for IPv4, which are static public IP addresses that can be associated with an EC2 instance. This is a perfect solution except EIPs incur a static fee if they are not associated with a running EC2 instance. A great workaround is to rely on an IPv6 address which does not have the same fees due to its 340 undecillion total number of addresses.

To leverage this free workaround, both AWS network gateway and EC2 instance have to be configured to only support IPv6:

* **VPC with IPv6 CIDR:** Virtual Private Cloud (VPC) needs to have an associated IPv6 CIDR block.
* **Subnet with IPv6 CIDR:** The subnet containing the EC2 instance also needs an IPv6 CIDR block.
* **EC2 Instance IPv6 Address:** When the EC2 instance is launched, assign it an IPv6 address from the subnet's range. This IPv6 address remains static for the instance, even when it's stopped and started.
* **Internet Gateway for IPv6:** Ensure VPC has an Internet Gateway configured to route IPv6 traffic.
* **Security Group Rules:** Configure the EC2 instance's security group to allow incoming traffic on the Minecraft server's port (default 25565) over IPv6.

_Note that this means friends using an IPv4-only router won’t be able to connect_

A final polishing step is to associate the static IPv6 to a domain name to make it easier to share with friends. I created a subdomain one one I already owned on [SquareSpace](https://www.squarespace.com/) to link with the AWS IPv6 address.

A year later, I've only spent about $10 on AWS with no maintenance. It’s cheap, easy to use and ready for the next time my friends want to play.