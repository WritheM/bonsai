# Bonsai - Growing small music communities together

Welcome to the Bonsai source.
Bonsai is a platform that allows music-heads to come together and share, discover and enjoy music together. 
We are an open sourced platform with distributed designs to increase stability and customization options.

## Features / Todo List

####Rooms
- [Bonsai will support multiple rooms](https://github.com/WritheM/bonsai/issues/5)
- [Each room will have syncronized chat](https://github.com/WritheM/bonsai/issues/7)
- [Users can talk in any number of rooms at once, even if they are not synced to that room. Synced means listening to the music of that room](https://github.com/WritheM/bonsai/issues/11)
- A staff list of infinite size can be set up by the room owner.
- [A permission schema can be selected by the room owner](https://github.com/WritheM/bonsai/issues/8)
- [Set and forget mode to play music to your listeners even when you're not online](https://github.com/WritheM/bonsai/issues/21)
- [Themes for each room, selectable by each room](https://github.com/WritheM/bonsai/issues/23)
- [Room owners can control the canvas for their room, similar to theme](https://github.com/WritheM/bonsai/issues/24)
- [Suggestions](https://github.com/WritheM/bonsai/issues/28)
- [Many options for each room, including google analytics code](https://github.com/WritheM/bonsai/issues/29)

####Users
- [status of each user can be seen by everyone else.](https://github.com/WritheM/bonsai/issues/30)
- [users can change their display names, but not their slug/username.](https://github.com/WritheM/bonsai/issues/12)

####DJs
- [Any synced user of that room can vote on the current DJs plays, with leafs and sparks](https://github.com/WritheM/bonsai/issues/10)

####Solo-Play
- [Users do not need to be in a community in order to listen to their playlists](https://github.com/WritheM/bonsai/issues/9)
- If a user hits pause when synced to a room, it will remove their sync status and move them to a solo-play session. They can continue chatting in an unsynced room.
- [You can have your own collection and your own playlists, that can be listened to](https://github.com/WritheM/bonsai/issues/20)

####Synced-Play
- [Rooms will allow rotating djs play music for the synced listeners of a room](https://github.com/WritheM/bonsai/issues/6)

####Bonsai Library
- [The source of music will start with Youtube, more will come later](https://github.com/WritheM/bonsai/issues/13)
- [On first play/add to playlist a link is stored in the Bonsai Library](https://github.com/WritheM/bonsai/issues/17)
- [Users can tag genres to existing library items to allow for discovery of similar music](https://github.com/WritheM/bonsai/issues/15)
- [Ability to search the Bonsai Library for music and have a "did you mean..." feature](https://github.com/WritheM/bonsai/issues/16)
- [Can identify when a song starts and ends in a link, allowing only a portion of a link to be played](https://github.com/WritheM/bonsai/issues/31)
- [Externally connects to other sites to create a library of albums](https://github.com/WritheM/bonsai/issues/32)

####Community
- [You can send messages to other users to have private conversations](https://github.com/WritheM/bonsai/issues/14)
- [Allow users to accept and send micro-transactions in cryptocurrencies to each other](https://github.com/WritheM/bonsai/issues/18)
- [Advertise events and special information from major rooms to all other rooms on an admin approved basis](https://github.com/WritheM/bonsai/issues/19)
- [Achievements... That mean nothing at all!](https://github.com/WritheM/bonsai/issues/26)

####API and Channels other than Web
- [Distributed design that allows for any number of front ends connecting to a series of backends](https://github.com/WritheM/bonsai/issues/22)
- [We may code retro for plug.dj bots to work on the API](https://github.com/WritheM/bonsai/issues/2)
- [A front end can be set up anywhere and connect to a single backend API](https://github.com/WritheM/bonsai/issues/1) 
- [You can connect via IRC client or XMPP client to the Bonsai API to chat from your own chat client](https://github.com/WritheM/bonsai/issues/3)


And much more...


## Vagrant Development - Installation

You can optionally use the vagrant configuration to set up a constructable development environment VM. To begin start by
downloading [VirtualBox](https://www.virtualbox.org/) and [Vagrants](https://www.vagrantup.com/). Once you have these installed
if you're not on a POSIX host machine it's reccomended you get a POSIX environment to work from. On windows [Cygwin](https://www.cygwin.com/)
is a good POSIX terminal that will work. Make sure you install the `openssl` package when installing.

Once you're all installed launch a terminal and navigate to the project folder. To begin execute the following command:

    vagrant up && vagrant ssh
    
This will create your VM, configure it and then despoit you in an SSH session on the VM. Once you're done you can exit the
ssh session and issue this command to stop the vm:

    vagrant halt
    
If you'd like to remove the VM entirely you can destroy it:

    vagrant destroy --force
    
This should give you a basic environment to work in that you can turn off when you're not using it.
