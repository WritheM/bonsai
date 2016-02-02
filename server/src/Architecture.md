# Server Architecture Summary

The server module recently was refactored, this document serves as the architecture
documentation & implementation tracking checklist.

# Goals

The goals of the refactor are to make the backend more robust and support a better
model for message passing that can help keep things sorted as the project grows.

The server is split into 3 major components:

1. **The Bridge** - The connection point for all clients. Ideally this will be horizontally
shardable and each instance will handle a slice of the clients.
2. **The Worker** - The heavy lifter of the system. This is where all the data manipulation
happens and is responsible for servicing content lookups. This commponent shouldn't have much if
any state and should be shardable easily for load management.
3. **The Orchastrator** - Responsible for periodic or scheduled events in the system. This module
is responsible for scheduling / triggering queue events and performing passive scans of media to
update the library.

# Stage 3 - Complete

* Move Server into Packages
* Move Common Components out into a common Package
* Implement common message queue client (`QueueClient`)
* Implement broadcast / rpc framework (`BroadcastClient`)
* Implement common routing logic

# Stage 2 - In Progress

* Convert Tracker State into Distributed Predictable State Reducer
  * **Complete** - Implement Simple Redux Master Reducer/Store
  * **Complete** - Implement example for state management messages over the message bus
  * **Note** - More automation desireable
* Support for context interception / augmentation - API calls should be able to provide relevant context
  * **Complete** - Split Message to Payload / Context
  * **Complete** - Wrap calls into Tracker Elements
* Build Tracker Framework - Lightweight reference object
  * **Complete** - Tracker Factory Pattern
  * **Complete** - Tracker element common logic
  * **Note** - Still need to finalize "owned" vs "non-owned" elements
  * **Note** - Still need to support controller configuration via tracker
* Unit Tests - *yeah... I know*

# Stage 1 - Designed / Accounted For

* Clean up DB/Model Initialization to be more portable
* Update message pattern from `Topic:verb` to `domain.context.action` type calls.
  * **Note** - We're using a temporary mapping until we can mirror those changes in the front end.

# Stage 0 - Planned

* Hook Points for Socket <---> Queue Communication
* Orchastrator - A process connected on the message queue to schedule periodic actions, like queue updates