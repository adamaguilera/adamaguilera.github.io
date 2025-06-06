---
title: Building a Cost-Effective, High-Availability Game Server on AWS (and Why Common Solutions Fall Short)
date: September 15, 2024
summary: In Minecraft, the allure of a persistent, shared world with friends is undeniable. But when it comes to hosting, striking the right balance between availability, performance, cost, and ease of management can be a surprisingly tricky endeavor.
---
# Building a Cost-Effective, High-Availability Game Server on AWS (and Why Common Solutions Fall Short)
*September 15, 2024*

In Minecraft, the allure of a persistent, shared world with friends is undeniable. But when it comes to hosting, striking the right balance between availability, performance, cost, and ease of management can be a surprisingly tricky endeavor.

Let's dissect why common solutions often miss the mark and then dive into a more robust, cloud-native approach.

## The Pitfalls of Common Minecraft Server Hosting Solutions

### 1. Self-Hosting: The Lure of Free, the Reality of Frustration

The most immediate thought for many is to self-host on a personal computer or even a Raspberry Pi. The initial appeal is obvious: it's "free." However, this seemingly simple approach quickly unravels when faced with the realities of long-term hosting:

* **Unreliable Availability:** Leaving a personal computer online 24/7 is not only inefficient but also prone to interruptions. After a few weeks of daily play, interest may wane, and the host's machine will inevitably be shut down. Months later, reviving the server requires direct intervention from the original host, creating friction for spontaneous play sessions.
* **Subpar Performance:** While a high-end gaming PC might offer decent performance, the friction of running a server in the background often leads to using older, less powerful laptops. This sacrifices server performance, leading to lag and a less enjoyable experience for players.
* **Geographical Latency:** If the host is on the East or West Coast, friends on the opposite side of the country will experience significantly higher latency compared to a cloud host strategically placed in the Midwest.

### 2. Third-Party Hosting and Minecraft Realms: Convenience at a Premium

Dedicated Minecraft hosting providers and Minecraft Realms offer excellent availability and generally good performance. They handle the technical complexities, allowing you to focus on playing. However, their primary drawback is cost:

* **Fixed Monthly Fees:** These services typically charge a fixed monthly fee, regardless of actual server usage. If your friends are inactive for a month, you're still paying the same amount. Ideally, cost should scale directly with usage to maximize value.

## Designing a Smarter AWS Solution: The Cost-Effective, On-Demand Game Server

Given the limitations of the above, I sought to leverage the power and flexibility of AWS to build a game server solution that prioritizes:

* **Maximizing Availability:** Friends can access the server whenever they want.
* **Minimizing Costs:** Pay only for what you use, as much as possible.
* **Decent Server Performance:** A smooth and enjoyable gameplay experience.
* **Minimal Manual Management and Maintenance:** Automate as much as possible.

My solution hinges on the ability to dynamically manage an EC2 instance, turning it on and off based on demand, and ensuring seamless access for friends.

### The Core Concept: EC2 with Usage-Based Billing

At its heart, the server runs on an AWS EC2 instance. The key to cost optimization here lies in understanding how EC2 instances are billed: you are not charged for a stopped EC2 instance. This means the server is configured to shut down when not in use, drastically reducing costs compared to a continuously running instance.

To achieve this, I implemented a simple yet effective mechanism:

* **Inactivity Detection and Shutdown:** CloudWatch alarms on the EC2 instance monitor network activity. If no network packets are detected for a defined period (e.g., 30 minutes), the alarm triggers an action to stop the EC2 instance. This directly links EC2 costs to actual server usage.

### The Challenge of Access: On-Demand Power-Up

A stopped server is, by definition, offline. The real trick is letting friends power it on themselves without needing AWS console access.

#### 1. The Serverless "On" Switch: AWS Lambda

A very simple Lambda function that tells AWS to start a specific EC2 instance when triggered.

#### 2. User-Friendly Activation: Discord Slash Commands

Getting friends to trigger this Lambda function is where Discord comes in. My friends belong to the same private discord server which solves both security and accessibility. Historically, Discord bots are hosted on a server running 24/7 to process messages, which goes against my goal of minimizing costs. Thankfully, Discord's Slash Commands changed everything.

Instead of hosting a bot, a slash command (like `/start-minecraft`) can be registered directly with Discord's API. When a user types this command in a Discord channel, Discord sends a secure request to an Amazon API Gateway endpoint. This API Gateway acts as a secure front door, receiving the Discord request and passing it to the Lambda function. The Lambda then processes the command, starts the EC2 instance, and can even send a confirmation message back to Discord.

This setup makes a discord "bot" incredibly lean with no idle server racking up charges.

For a deeper dive into setting up a Discord bot with AWS Lambda and API Gateway for slash commands, this README is a great resource: [AWS Lambda Discord Bot](https://github.com/ker0olos/aws-lambda-discord-bot).

### The IPv4 Problem and the IPv6 Solution

A crucial hurdle in hosting game servers is IP addresses. When an EC2 instance is stopped and then restarted, it receives a new public IPv4 address. This means players would constantly have to update their Minecraft client with the new server IP, which is a major usability pain point.

* **The Elastic IP (IPv4) Conundrum:** AWS offers Elastic IPs (EIPs) for IPv4, which are static public IP addresses that can be associated with an EC2 instance. This seems like the perfect solution. However, there's a catch: Elastic IP addresses for IPv4 incur a static fee if they are not associated with a running EC2 instance. Due to the limited global supply of IPv4 addresses, AWS charges for unused EIPs to encourage efficient allocation. This goes against the "minimize costs" goal if the server is frequently stopped.

* **The IPv6 Advantage: Free Static IPs:** This is where IPv6 comes to the rescue! Unlike IPv4, which is nearing exhaustion, IPv6 offers an astronomically larger address space. This abundance means that AWS does not charge for Elastic IP addresses for IPv6, regardless of whether they are associated with a running instance.

To leverage this, both the AWS network gateway and EC2 instance can be configured to only support IPv6. Here's a simplified explanation of how it works:

* **VPC with IPv6 CIDR:** Virtual Private Cloud (VPC) needs to have an associated IPv6 CIDR block.
* **Subnet with IPv6 CIDR:** The subnet containing the EC2 instance also needs an IPv6 CIDR block.
* **EC2 Instance IPv6 Address:** When the EC2 instance is launched, assign it an IPv6 address from the subnet's range. This IPv6 address remains static for the instance, even when it's stopped and started.
* **Internet Gateway for IPv6:** Ensure VPC has an Internet Gateway configured to route IPv6 traffic.
* **Security Group Rules:** Configure the EC2 instance's security group to allow incoming traffic on the Minecraft server's port (default 25565) over IPv6.

By utilizing IPv6, the Minecraft server retains a constant, static IP address that friends can save in their game, eliminating the need to update it every time the server starts. This provides a seamless and reliable experience while keeping costs in check.

## The Result: A Lean, Mean, Minecraft Machine

This architecture provides a powerful blend of features:

* **High Availability:** Friends can start the server whenever they want, ensuring it's available when they're ready to play.
* **Minimal Costs:** Only pay for the EC2 instance compute time when the server is actually in use, and there are no ongoing EIP charges thanks to IPv6.
* **Decent Server Performance:** Choose an EC2 instance type that provides ample resources for a smooth Minecraft experience.
* **Minimal Manual Management:** The Discord bot and automated shutdown handle the heavy lifting, removing any manual intervention.

This cloud-native approach transforms Minecraft server hosting from a fixed-cost burden into an efficient, usage-based model, making it the ideal solution for casual co-op gaming with friends.