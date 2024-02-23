  <img src="https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fl5wzete4rsiczmjnl46l.png" alt="Cover Image" />
  <hr />
  
  # A complete guide to open source - 100x simpler
  
  **Tags:** `opensource`, `tutorial`, `github`, `beginners`

  **Published At:** 2/1/2024, 8:13:12 AM

  **URL:** [https://dev.to/anmolbaranwal/a-complete-guide-to-open-source-100x-simpler-2d6c](https://dev.to/anmolbaranwal/a-complete-guide-to-open-source-100x-simpler-2d6c)

  <hr />
  It has been more than 500 days for me in Open Source. 

I've answered 35+ discussions on GitHub (actively participated in 300+), successfully merged over 200 PRs, earned 500+ Stars, and contributed to more than 40 repositories. I know enough to guide people.

Don't worry.
It's okay if you don't know the terms; we will cover everything.

There are plenty of other blogs available, but they may not cover everything, which is the main aim of this post.

I learned with the flow without any course or resources.
So, it took me a very long time to understand everything.
But you don't need to.

Each person is at a different stage, so I've created a Table of Contents that outlines what each section will cover.

If you know those sections or are perfectly confident, skip them to the next one. 

Note:
Read and skip the sections in order. Previous ones are essential for upcoming sections, and it is structured accordingly.
I recommend reading it all!

I'm going to pour my every experience into this post.
Let's get started. I hope you will enjoy it!

---

## Table of Contents

1. Concept of Open Source.
2. Why should you contribute to Open Source?
3. What it means to contribute.
4. What are the roles in a typical Open Source project?
5. Pre-requisites (Git + GitHub + Markdown).
6. Conventional Commits.
7. Basic Flow of Open Source Contribution.
8. Standard Guidelines of Good Open Source project.
9. How to Find good Open Source Projects.
10. Ideal ways to contribute to Open Source.
11. How to suggest/address code request changes in Pull Request.
12. Legal Side of Open Source.
13. Extra Resources.

--- 

## 1. Concept of Open Source.

Imagine you have a cool project, like a super fun game. Right now, only you can play it because you have the secret rules (code). Now, what if you tell your friends the rules, and they start adding cool new things to your game? That's like Open Source!

Open Source means sharing the rules (code) of your project with everyone. Just like when you share your game rules, others can see, learn, and even add new features. For example, imagine if Google shared how they make Google Maps. People can help make it better by fixing problems and adding cool stuff.

It's like a big team helping each other for free! And if you help, too, it's like getting a special badge that says, "I helped make this cool thing!". 

Imagine if you could tell everyone, "I helped make Google Maps!" That's why Open Source is damn awesome.

> You don't have to be a tech expert. Open Source is for everyone, even those who don't know how to code. Yes, even for YOU :)

I hope you get a little idea of what Open Source is.

![Open source isn't about perfect code; it's about passion and the noble goal of making lives better.
](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/02pk9u0y6yum2uo9blbc.png)

&nbsp;

### Roadmap to Open Source

There is no such roadmap, even if you ask experienced people in open source. There can be a general flow, but I assure you everyone has their own way of getting involved in open source.

When I started, I just wanted to learn about GitHub, and I wasn't even aware of open source. So, if you're new, don't worry.
Just explore and have fun!

--- 

## 2. Why should you contribute to Open Source?

> Open Source is more than merging a PR.

In a world where we are more connected than ever, being a part of an open-source community can be the key to unlocking new opportunities and achieving personal growth.

You **Code**. **Collaborate**. **Network**.

YOU don't need a job.
YOU don't need experience.
You don't need to be a tech guy.

YOU need nothing to get started.
And the open source community is very supportive.

What will you learn?
You will gain practical knowledge.
You will gain modern development practices.
You will gain credibility and meet new people.

Most important.
You will always be welcome.
And YOU interact with experienced people all the time. 🔥

There are plenty of reasons why you should contribute to an open source:

- To learn, teach, and gain experience in almost any skill you can imagine.

- Everything being public adds credibility to your profile.

- To build up your reputation and help grow your career.

- To find a mentor if you need one or build a strong network.

- It provides personal satisfaction, and you never know who is watching – maybe your next employer or partner.

Tip: Pick good organizations rather than individual repositories for long-term benefit.

---

## 3. What it means to contribute.

If you're new to open source, the process can feel intimidating.

People are confused about this.
How do you find the right project? 
What if you don’t know how to code? 
What if something goes wrong?

&nbsp;

### You don’t have to contribute code

I've said it enough times, saying it again.
A common and deadly misconception about contributing to open source is that you must contribute code.
Trust me, you don't have to.

- If you like planning events.

   - organize workshops or meetups for the project.
   - Help community members find the correct medium for speakers

- If you like designing.

   - Improve the design to increase usability.
   - You can make a style guide that developers can follow for a consistent visual design.
   - You know about UX laws that you use to propose changes.
   - Create a new logo and improve branding.

- If you like writing.

   - Improve documentation and contributing guidelines
   - Write tutorials and suggest newsletters.
   
   > Don't underestimate the power of documentation.

- Do you like coding?

   - Solve technical problems.
   - Suggest new features.
   - Improve testing and other code standards.

Now, you need to find a good software project, right?

Hell, nah!

- You can work on [awesome lists](https://github.com/sindresorhus/awesome).

- You can contribute and frame [interview questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions).

And a whole lot more! Explore it yourself.

---

## 4. What are the roles in a typical Open Source project?

This is important, and everyone needs to be familiar with the roles.

### Contributors:

These people contribute to the project in one way or another. They follow `contributing guidelines` which guide them on how they can contribute and help the project grow.

&nbsp;

### Maintainers:

Every good open source project has a lot going on, and these people are responsible for driving the vision and goals of a project. They review the code and suggest and consider features.

They are more like an internal part of the team.

The tasks can differ based on the team.
Some maintainers assign people to issues, while some help in reviewing the code, and do several other works.

I'm also an open source maintainer of LinksHub.

&nbsp;

### Author:

The person/s or organization who created the project has the power to recruit maintainers, assign new roles, and is the main authority.

&nbsp;

### Project Owners:

The person/s who has administrative ownership over the organization or project (not always the same as the original author)

&nbsp;

### Community members/Users:

These are the members of the community who can provide feedback about the product, suggest bugs or improvements, and many more.

These are neither contributors nor maintainers, just the users of the product.

---

## 5. Pre-requisites (Git + GitHub + Markdown).

The open source community is on GitHub, and so you need to know a bit about Git & GitHub.

Let's cover each.

&nbsp;

### GitHub:

Imagine GitHub as a big, magical toy box where people keep their favorite toys (code). Everyone can see the toys and even play with them!

So, let's say you have a cool toy (code) like a robot. You want to make it even better so you put it in the GitHub toy box. Now, your friends can see your robot, give suggestions, and even add new cool things!

GitHub helps friends (developers) work together on toys (code) and make them more awesome. It's like a playground where everyone shares their toys, helps each other, and has a lot of fun!

You can learn more about [GitHub](https://github.com/) at the official website. 

![100 million users of GitHub as a banner](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sx0xsz4fb7fjp0gmjhdk.png)

- You can learn about it through YouTube tutorials or the [Google Course](https://www.coursera.org/learn/introduction-git-github), which is where I learned it around 3 years ago.
&nbsp;

### Git:

Imagine Git as a magical backpack for your computer. When you make a drawing on your computer, Git helps you save different versions of your drawing. So, if you want to go back to the way your drawing looked yesterday, `Git` helps you with that.

It's like having a time machine for your computer drawings!
Lots of other concepts are involved but this is what people mean when they say Git is a "Version Control System".

I learned Git from a popular [free Udacity course](https://www.udacity.com/course/version-control-with-git--ud123).

I can assure you this is one of the best short courses that doesn't make you feel like an idiot and explains everything in depth.

![udacity git course](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j2z4bk79qcco6ktjm4nn.png)

&nbsp;

### Markdown:

Markdown is an easy-to-read, easy-to-write language for formatting plain text. 

It is used while **communicating everything** on GitHub. You must know the basics of it.

It's simple if you have used HTML before.

This [markdown cheat sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) covers everything. I still use it to date.

This is another [markdown cheatsheet](https://cheatography.com/simon-fermor/cheat-sheets/markdown/) which you can refer to by cheatography.

You can use [Dillinger](https://dillinger.io/) as an online editor that you can use to see the preview of what the final output looks like.

---

## 6. Conventional Commits. 

If you know a bit about Git then you know.
Commit messages are crucial and can distinguish beginners from experienced developers. These conventions make commits self-explanatory regarding their type. 

You should follow these [conventions](https://www.conventionalcommits.org/en/v1.0.0/) every time.

![conventional commits](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v5fs350p0myp5lvlzg2k.png)

One handy rule that you must be aware of; we only use the present tense while writing commit messages. `Added ..` is an incorrect commit message.

A lot is involved in technical terms, but you can just use it for the sake of conventions.

![why to use conventional commits](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jtmh8uufkvogunp5cknc.png)

---

## 7. Standard Guidelines of Good Open Source Project

There is no correct answer to this, but every good open source project must have clear guidelines to help you on `HOW` you can contribute to their project (`contributing.md`) and a few [other requirements](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/about-community-profiles-for-public-repositories). 

![community standards](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1k9yvhyk2wls1mjnzak0.png)

&nbsp;

Let's cover each in depth.

### Contributing guidelines (Contributing.md)

This is undoubtedly the most important aspect if you want others to contribute to your project.

Contributing guidelines can vary from project to project, and it must answer these questions unless it's defined in Readme:

- How to get started with the project.
   - Clear instructions on all the options to set the project locally
- Clear step-by-step instructions on what they can do with the project and where they can contribute
- It can also include code quality standards and testing
- It is important to note that not every project has `contributing.md` depending on how they want the contributions.

The best contributing guidelines I've come across are from [Simple Icons](https://github.com/simple-icons/simple-icons/blob/develop/CONTRIBUTING.md). I started my open source journey with Simple Icons :)

Some other examples that you can look at [LinksHub](https://github.com/rupali-codes/LinksHub/blob/main/CONTRIBUTING.md) which I've personally contributed to and improved over time along with other maintainers.

&nbsp;

### README

A `README.md` file, written in markdown, is the most important document that provides information about a project, including its purpose, installation instructions, tech stack, and usage examples. 

Readme can vary from project to project, but a good Readme always attracts more contributors.

For instance, you can see Readme examples of [Simple Icons](https://github.com/simple-icons/simple-icons/blob/develop/README.md), [Handle Multiple Issues](https://github.com/Anmol-Baranwal/handle-multiple-issues/blob/main/README.md), [Full-Stack MongoDB Project](https://github.com/Anmol-Baranwal/MongoDB-Query-Fetcher), and [Dailydotdev](https://github.com/dailydotdev/daily/blob/master/README.md).

&nbsp;

### Code of Conduct

The code of conduct sets ground rules for participants’ behavior and helps to facilitate a friendly, welcoming environment. 

The name of the file should be `CODE_OF_CONDUCT.md`, and you can see an example [here](https://github.com/Anmol-Baranwal/Awesome-Illustrations-4Projects?tab=coc-ov-file#readme).

You can also see [GitHub Community Code of Conduct](https://docs.github.com/en/site-policy/github-terms/github-community-code-of-conduct).

&nbsp;

### Description

A project description increases visibility and influences algorithms to showcase your project in GitHub's `Explore more repositories`. This is what people will see when they see your project.

![description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yfbstrhht7dkxlf5rjem.png)

&nbsp;

### License

By definition, every open source project must have an open source license. If a project doesn't have a license, it is not open source.

Open Source is an unusual circumstance, however, because the author expects that others will use, modify, and share the work. But because the legal default is still exclusive copyright, they need to explicitly give these permissions with a license.

You can refer to the [official guide](https://opensource.guide/legal/#which-open-source-license-is-appropriate-for-my-project) on which license you should choose for your project.

Find all the licenses [here](https://choosealicense.com/).

&nbsp;

### Security Policy

Read on official docs about [Adding a security policy to your repository](https://docs.github.com/en/code-security/getting-started/adding-a-security-policy-to-your-repository).

GitHub repositories involve lots of packages and dependencies, which can lead to security vulnerabilities.

This will be helpful because whenever someone creates an issue in your repository, they will see a link to the security policy associated with your project.

![security policy while they create an issue](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ulu2ijw0pio1lbu6ckj3.png)

I like and recommend the [security policy](https://github.com/novuhq/novu/security) of Novu.

&nbsp;

### Issues & Issue Templates

Issues are used to track bugs, feature requests, and other tasks related to a project.
They can be opened by anyone, and everyone uses it to track and prioritize work that needs to be done.
Issues can be assigned to specific team members, labeled with tags, and can have discussions related to them.

Read on [how to create an issue in GitHub](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue).

Generally, the issue templates are in markdown format.

![markdown issue templates](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vyfc2nud69uk8utp7yhs.png)

But the new ones (currently in beta) are like issue forms that improve consistency, and people can contribute easily. How?

Issue forms can be more user-friendly than Markdown templates, especially for contributors who may not be familiar with Markdown syntax.

With issue forms, you can ensure that all issues are created in a consistent format, with the same fields and information requested every time. This makes it easier for maintainers to review and respond to issues quickly.

![issue forms](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4vkw6eh4o80wpn2oqbrp.png)

You can create these issue templates that contributors will see when they try to create a new issue.

![issue forms](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gzojl4uexep82cf13zih.png)

You can create a file in GitHub: `.github/ISSUE_TEMPLATE/file_name.yml`

See this [list](https://github.com/Anmol-Baranwal/Awesome-Illustrations-4Projects/tree/main/.github/ISSUE_TEMPLATE) and how it [looks](https://github.com/Anmol-Baranwal/Awesome-Illustrations-4Projects/issues/new/choose).

You can find a list of issue forms in this [gist](https://gist.github.com/Anmol-Baranwal/cccf913ada8f9b0f0d178fdcf0a2d0f5) that I created a while back.

&nbsp;

### Pull Requests & Pull Request Templates

When you make changes to the codebase of a project and want those changes to be reviewed and eventually added to the project, you create a pull request.

In simple terms, a pull request (PR) is a way to propose changes to a project ultimately to solve a particular issue. 

Read on [how to create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

> Pull Request template

What it does is, that whenever someone creates a pull request, they will receive a predefined template with a sample format. This helps them provide clear information about the pull request.

Read official docs on [Creating a pull request template for your repository](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository).

For instance, see this [pull_request_template.md](https://github.com/Anmol-Baranwal/Awesome-Illustrations-4Projects/blob/main/.github/pull_request_template.md?plain=1) along with [it's preview](https://github.com/Anmol-Baranwal/Awesome-Illustrations-4Projects/blob/main/.github/pull_request_template.md).

You can create multiple pull request templates to offer options for required information in different types of pull requests. 

However, many people may not be aware of this feature, and it can be confusing for first-time contributors. As far as I know, there isn't an option for similar templates in issue forms, and only markdown is supported.

&nbsp;

In some repositories, you can find a Wiki that serves as an extra guide to the project. It depends on the project, but this is what a [good wiki](https://github.com/adam-p/markdown-here/wiki) looks like.

Did you know you can add a social image to your repository?
You can find the option in settings.

![social preview](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1m54lpqa197v08pegrcw.png)

---

## 8. Basic Flow of Open Source Contribution.

If you prefer reading official docs, read it [here](https://docs.github.com/en/get-started/using-github/github-flow#following-github-flow).

It's okay if you don't want to, I will explain!

Every good open source project follows a basic flow, and you will be treated as a spammy contributor most of the time if you don't follow it.

a. The first step is to read the contributing guidelines that you can find in `Contributing.md` or sometimes `Readme.md`.

b. Now, you should either create a new issue or find open ones that aren't assigned to anyone. You can learn [how to create an issue on GitHub](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue).

![no assignee to the issue](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/29rbzk0epu5wcrn7lfh2.png)

You can simply comment to see if the issue is open for work.
However, make sure you can solve that issue before requesting to get assigned.

c. Once you're assigned, you can make a pull request with the changes in a different branch, and [correctly link the issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword) so that the linked issue is closed when the Pull Request is merged. Read on [how to create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

d. You should address the review changes (Read more in the 11th section) timely, and you can ask the person who suggested the changes to help you if you're facing big problems.
By the way, you need to push the changes in the same branch from which the PR is created, it will automatically be shown in the Pull Request.

> What is a Spam PR? Avoid it at all costs!

These conditions are considered spam:

- Making a Pull Request without getting assigned.
- Making a Pull Request to an issue assigned to someone else.
- Anything that doesn't follow basic [open source etiquette](https://developer.mozilla.org/en-US/docs/MDN/Community/Open_source_etiquette).

It's okay if you make those mistakes; some maintainers may not have time to explain everything to everyone. Just make sure to never do it again.

Projects that, for example, focus on Data Structures and Algorithms (DSA) or JavaScript repositories that don't follow these etiquettes are actually making the situation worse. Creating spammy Pull Requests is not acceptable.

---

## 9. How to Find Good Open Source Projects.

This is undoubtedly one of the biggest questions that people ask.
And I always tell you that you should choose a project that excites you rather than just following the tech stack.

I've covered everything here on [🎁 Shortcut to Find Open Source Projects 100x faster](https://dev.to/anmolbaranwal/shortcut-to-find-open-source-projects-100x-faster-3lje).

It has received over 20k views, and I wrote it after careful consideration and in response to numerous requests.

However, to get you a list of helpful repositories. You can find it [20 Open Source projects you shouldn't miss in 2024](https://dev.to/anmolbaranwal/20-open-source-projects-you-shouldnt-miss-in-2024-3ja4). These are all close to me.

Check [300+ Open source projects](https://github.com/Anmol-Baranwal?tab=stars) in different categories. Updated daily ✅

I hope this can help you find the project you were searching for! See you in open source.

---

## 10. Ideal ways to contribute to Open Source.

As I said, there is no roadmap in open source.
It depends on person to person and how they approach it.

But I'm an open-source maintainer, and I can tell you about how I prefer contributors to contribute to my project.

Three simple steps, focusing on long-term commitments:

a. Contributors should read the guidelines and understand the basic workflow for contributors. You should avoid asking questions without researching on your own, as it can give the wrong impression.

b. Join the community, observe ongoing activities, and identify areas where you can comfortably contribute. The next step is to engage with the maintainers about how they want the project to grow. What their vision is, and see if you can help. Solidify ideas and suggestions through communication.

c. Create an issue, write your plan clearly (no copy-paste from ChatGPT), and outline what you intend to do. Once assigned, submit a pull request (PR), and address requested changes timely. Keep the PR active; if it becomes stale, make sure to tell them the reason. 

Learn more about [effective communication](https://opensource.guide/how-to-contribute/#communicating-effectively) in open source projects.

I'm not too strict, but handling a large project in a big organization can be challenging. Respecting everyone's time is crucial. Keep contributing, and gradually you will become a significant part of the project.

---

## 11. How to suggest/address code request changes in Pull Request.

I've seen some contributors leaving their pending work as soon as they requested changes in their Pull Request. Trust me, if you make this a habit, maintainers will be less likely to assign you issues.

Anyway, there are many ways you can be requested for the changes.
For instance, see [PR #1152 in LinksHub](https://github.com/rupali-codes/LinksHub/pull/1152), [PR #864 in Dailydotdev](https://github.com/dailydotdev/daily/pull/864).

You can clearly see the changes requested along with the detailed review.

![code review](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ugeqptx41vudwqwsvl52.png)

You can also directly commit if they have suggested the changes which is a neat little feature in GitHub. Learn about giving effective [code feedback reviews](https://www.freecodecamp.org/news/code-review-tips/) for maintainers & contributors in detail on freecodecamp.

---

## 12. Legal Side of Open Source.

Open Source is an unusual circumstance, however, because the author expects that others will use, modify, and share the work. But because the legal default is still exclusive copyright, you need to explicitly give these permissions with a license. 

These rules also apply when someone contributes to your project. Without a license or other agreement in place, any contributions are exclusively owned by their authors. That means nobody – not even you – can use, copy, distribute, or modify their contributions.

> Making your GitHub project public is not the same as licensing your project.

For others to use, distribute, modify, or contribute back to your project, you must include an open source license.
For example, someone cannot legally use any part of your GitHub project in their code, even if it’s public unless you explicitly give them the right to do so.

You can refer to the [official guide](https://opensource.guide/legal/#which-open-source-license-is-appropriate-for-my-project) on which license you should choose for your project. 

I mostly use [MIT License](https://choosealicense.com/licenses/mit/) since it's easy to understand, and you can use it if you don't know much about licenses.

### Does my project need an additional contributor agreement?

You can read more about this [here](https://opensource.guide/legal/#does-my-project-need-an-additional-contributor-agreement). 

You can use the [CLA assistant](https://github.com/cla-assistant/cla-assistant), which is super simple.

For instance, you can check my [Pull Request 864](https://github.com/dailydotdev/daily/pull/864) in dailydotdev.

![pull request in dailydotdev](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mg61w52841602sas0r5v.png)

You have to sign up using GitHub, and it's perfectly safe.

![cla assistant](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vj7hlv6r2z2g5thldppi.png)

Then it's all good to go.

---

## 13. Extra Resources.

These are some of the resources that I recommend giving a read.
I've found these in my open source journey, and they offer a decent viewpoint.

- [Official Guide](https://opensource.guide/) - An official guide that covers everything such as:

   - How to Contribute to Open Source
   - Starting an Open Source Project
   - Best practices for maintainers
   - Finding users for your project
   - Building Welcoming Communities, and many more ...

- [Open Source with Pradumna](https://github.com/Pradumnasaraf/open-source-with-pradumna) - It contains resources and materials to learn and get yourself started with Open Source, Git, and GitHub. It is a comprehensive guide with 800+ Stars on GitHub.

- [How to Contribute to Open Source Projects - Freecodecamp](https://www.freecodecamp.org/news/how-to-contribute-to-open-source-projects-beginners-guide/) - This guide outlines the roles in open source projects, the essential elements, and everything you need to start your journey with Open Source. 

- [Open Source Events](https://github.com/anubhavpulkit/Open-Source-Events) - Collection of Open Source Events and Hackathon's on a monthly basis. 

- [Awesome GitHub Profile READMEs](https://zzetao.github.io/awesome-github-profile/) - 😎 A curated list of awesome GitHub Profile READMEs 📝

- [GitHub Profile Generator](https://gprm.itsvg.in) - create your perfect GitHub Profile ReadMe in the best possible way. Lots of features and tools are included, all for free!

- [GitHub Community Guidelines](https://docs.github.com/en/site-policy/github-terms/github-community-guidelines) - official guidelines to build a strong, open-minded, welcoming community that supports collaboration in a proper digital space.

- [Participating in open source communities](https://www.linuxfoundation.org/resources/open-source-guides/participating-in-open-source-communities) - a strong guide with useful insights from Linux Foundation.

---

![Becoming Top 1% in open source isn't the goal, impacting 1M lives is](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9xs5amyzvwd06y8b63xy.png)

&nbsp;

Trust me.
Now, you've got everything you need to start your open source journey.

It took me a very, very long time to write this! 
A very very long time.

There are more things to cover, like co-authored commits or branch rules, but they aren't necessary for beginners. A story for another time!

Whenever someone asks how they can start their journey with open source, share this post, and voila! 
I hope people can refer back to this.

> I'll update it every 3 months if I discover anything good enough.

I'm not a big fan of social media, but I occasionally share about open source on [LinkedIn](https://www.linkedin.com/in/Anmol-Baranwal/). That's where I used those couple of images :)

I've invested a lot in the open source community, and I plan to continue doing so. If you'd like to support me, you can [sponsor me on GitHub](https://github.com/sponsors/Anmol-Baranwal). No pressure, I'm not that kind of person. LOL!

> If you are keen on sponsoring this post, shoot me a message at anmolbaranwal119@gmail.com or hit me up on Twitter! 🚀

If you enjoyed this guide, please support me by following me on my GitHub & Twitter.

- [GitHub](https://github.com/Anmol-Baranwal) - Become Top 1% in Open Source with me!
- [Twitter](https://twitter.com/Anmol_Codes)
- [LinkedIn](https://www.linkedin.com/in/Anmol-Baranwal/)

{% embed https://dev.to/anmolbaranwal %}

Write more, inspire more.

![Ending GIF waving goodbye](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2ylsck6b9c7ei6makpqd.gif)    
  