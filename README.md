# Social-Network-API

doublecheck

This application reperesents the database side of a social networking application. There are two main components: users and thoughts. Within thoughts, there is functionality for reactions - as in, reactions to thoughts. Please see the following videos for an in-depth look at installation and use of this back-end product:

[Install](https://watch.screencastify.com/v/XRiuR0CXecSyJrgO4Ja5)

[Demo 1](https://watch.screencastify.com/v/twvDEomoSRU7S3BneLP6)

[Demo 2](https://watch.screencastify.com/v/k6y1saRTjeun6b8HFDmp)

[Demo 3](https://watch.screencastify.com/v/vfyASZGf3G9NosEV2QoL)


## Installation

Once you have cloned the repository, simply run the following from the root directory:

`npm install` <br />
`npm start` <br />

The server will then run out of port 3001 on your local machine.

## User

Users are the center of the application that is envisioned as the use case for this back-end API. No user can interact with the application without first registering as a user in the API (in theory).

### Schema

Users consist of the Mongoose native primary key `_id`, `username`, `email`, a reference to the Thought schema (below) as `thoughts`, and a self-referential field `friends`. 

## Thought

Thoughts are associated with Users - they are the posts that users can make in the app. They have an associated schema Reaction that act as responses to users' thoughts.

### Schema

Thoughts consist of the Mongoose native primary key `_id`, the associated user's primary key, tracked as `userId`, the content of the thought `thoughtText`, a timestamp `createdAt`, `username`, and `reactions` (below). This schema does not need to track `username`, as it is tracking `userId`, which, in acting equivilantly to a forign key in a SQL database, is enough information for associating the correct user to any given thought. `username` is only included here as it is explicitly defined in the schema in the Technical Acceptance Criteria in the assignment. `userId` turns out to be much more userful as it can be used to implement, upon deleting a user, the deletion of all of that user's associated thoughts.

## Reaction

Reactions are other user's responses to Thoughts. They exist within the Thought model's `reactions` property. In the database, Reactions will have the most instances as users population the database with debate and discussion.

### Schema

Reactions consist of custom primary key `reactionId`, the content of the reaction `reactionBody`, `username`, and timestamp`createdAt`. In future scope of this project, addition of `userId` to this schema would be a more robust way of keeping track of the associated user.

## Dependencies

This backend runs on node, and uses ExpressJS for the server, MongoDB for database via Mongoose as the ODM, and MomentJS to format the timestamps.

## Collaboration

Please reach out to me at ddoherty6@gmail.com if you would like access to the repository for collaboration.