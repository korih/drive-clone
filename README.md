# Drive Tutorial

This is a file upload clone. It supports user authentication, file uploads, file and folder management, and file deletion.

The project is written in Typescript and utilizes Next.js, TailwindCSS, SQL DrizzleORM, SingleStore as file management, Authentication with Clerk, File storage with Uploadthing, User Metrics with PostHog, and is deployed on Netlify.

## TODO
- [x] Setup database
- [x] Setup data models
- [x] Add auth
- [x] Add file upload
- [x] add sandbox to only work in dev environment? or just remove it

### Setup For database
Connected database to singlestore, setup by changing stuff in the .env file, so we can connect to database.

Then went and added it to env.js for easy access. Modified the drizzle config for ORM setup, and modified schema for simple testing if it works.

#### TODO from here
- [x] Work on frontend components to make them nicer
- [x] Fix bug where you can't delete files
- [x] Add caps on other users, so someone else can join and test it but not really do anything else
- [ ] Fix Styling
- [ ] Test it a bit more

