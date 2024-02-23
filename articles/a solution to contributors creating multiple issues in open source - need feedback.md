  <img src="https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fm4c0ieb8lynz5p8bnyx6.png" alt="Cover Image" />
  <hr />
  
  # a solution to contributors creating multiple issues in open source - need feedback 🤞
  
  **Tags:** `github`, `githubactions`, `opensource`, `discuss`

  **Published At:** 2/6/2024, 11:41:25 AM

  **URL:** [https://dev.to/anmolbaranwal/a-solution-to-contributors-creating-multiple-issues-in-open-source-need-feedback-31cg](https://dev.to/anmolbaranwal/a-solution-to-contributors-creating-multiple-issues-in-open-source-need-feedback-31cg)

  <hr />
  In some open source projects, contributors make lots of issues with some time between them, making it hard to manage. The more issues there are, the tougher it gets.

Every good open source project or major organization deals with this problem.

In general, contributors start with just one issue at a time. As they contribute more, they are allowed to work on multiple issues because they would have gained the trust of maintainers.

Now, during Hacktoberfest or other open source events.
Most of the contributors create multiple issues even when it's mentioned in the guidelines not to do so.

![contributing guidelines](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i6vtw76s6jh9fy9g3a2e.png)

We faced a lot of problems in tracking if a contributor made several issues because they are human and have the intelligence to bypass the system.

In our situation, there are 3-4 maintainers, and each maintainer assigns the issue whenever they can. So, sometimes when I assign someone, he creates an issue after some gap, and this time another maintainer assigns it. 

We cannot go back to check which maintainer is assigning whom.
We can solve it with just 1 person assigning issues, but it is still a problem on how one can remember that anyway. For instance, this is not feasible where issues cross 100 or so.

This creates a major problem for maintainers to track how many contributors have created multiple issues.

As you know, I'm a developer and a very picky one :D
I solved this myself since there was no existing solution.

## The solution

I created [handle multiple issues](https://github.com/Anmol-Baranwal/handle-multiple-issues) workflow to handle this efficiently and quickly.

> With this GitHub workflow, you can automate tasks whenever an author creates multiple issues.

So, you can see the case of [LinksHub Issue #2251](https://github.com/rupali-codes/LinksHub/issues/2251).

The bot clearly says this.

![example](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7xh7je84nqyhxb355cdr.png)

This helps the maintainers because the issues are linked, and it will get noticed.

Now, I have made it good enough to use it in any organization.

```yaml
name: Handle Multiple Issues

on:
  issues:
    types:
      - reopened
      - opened
jobs:
  handle-multiple-issues:
    runs-on: ubuntu-latest
    steps:
      - name: Handle Multiple Issues
        uses: Anmol-Baranwal/handle-multiple-issues@v1
        with:
          label: "multiple issues" #default
          close: false  #default
          issueNumber: true  #default is true
```

Marketplace: [github.com/marketplace/actions/handle-multiple-issues](https://github.com/marketplace/actions/handle-multiple-issues)

&nbsp;

## What I did was create options.

These options improve the solution for many end-user cases and can make it ready to use in good open source projects.

You can read about options [here](https://github.com/marketplace/actions/handle-multiple-issues#inputs). I will explain, even if you don't want to.

### use cases with options

You can also filter the issues assigned to the author in that open source project.

You can add your own comment message (even multiline) to the issue. (Can be fully customized)

You can add label/labels based on your preferences.

Optionally, you can also close the issue (previous issues won't be affected), and only the current issue will be closed.

You can ignore this workflow for specific users by using `ignore users`.

You can directly pass `ignoreCollaborators`.

These are some of the screenshots that you can see to understand the context better.


Workflow:

![workflow](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ian8ej3j49w8ojxg28qx.png)

Result:

![output of the workflow](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2z9y5pmqjcj4zq39xeb0.png)

There are many more which you can learn more from the [readme](https://github.com/Anmol-Baranwal/handle-multiple-issues/blob/main/README.md).

---

I need serious feedback on this. 
Thanks for any help you can provide :D

1. What else can be added here?

2. What can be improved?

3. Is it good enough to use in any open source project?

Thanks a bunch!

Repo: [github.com/Anmol-Baranwal/handle-multiple-issues](https://github.com/Anmol-Baranwal/handle-multiple-issues)
Marketplace: [github.com/marketplace/actions/handle-multiple-issues](https://github.com/marketplace/actions/handle-multiple-issues)

You can connect me on GitHub.

{% embed https://github.com/Anmol-Baranwal %}    
  