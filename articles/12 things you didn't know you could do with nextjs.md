  <img src="https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fzh21q3icna04djlxy3j4.png" alt="Cover Image" />
  <hr />
  
  # 12 things you didn't know you could do with Nextjs
  
  **Tags:** `nextjs`, `programming`, `beginners`, `tutorial`

  **Published At:** 2/20/2024, 2:00:32 PM

  **URL:** [https://dev.to/anmolbaranwal/12-things-you-didnt-know-you-could-do-with-nextjs-386b](https://dev.to/anmolbaranwal/12-things-you-didnt-know-you-could-do-with-nextjs-386b)

  <hr />
  I've made several applications with Next.js and am truly amazed by the amount of things that we can do with it.

I recently went deep into the docs and want to tell everything that I learned. There are so many things that we can do, Next.js is truly awesome :D
 
I'm writing this for the latest version (v14).

> Before continuing, I want to tell you about an optimized template I made for Next.js + TypeScript + Tailwind tech stack.

{% cta https://github.com/Anmol-Baranwal/Nextjs-TypeScript-Tailwind-Template %} 🚀 Visit Optimized Template {% endcta %}

![template](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f52rjpsvornq25e9p5ou.png)
<figcaption>Please star it so that others can discover it :)</figcaption>

&nbsp;

Most of the examples are from the official docs. So, it's trustworthy.

Let's get started then.

---

## 1. Next.js offers a course.

The course is one of the best and easiest ways to get started with Next.js. Unlike other resources, it starts with React and then switches it to Next.js.

It has almost everything from extra resources, and docs and covers the concepts in deep.

Don't worry, I don't write anything without trying it myself.

![course](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ofx76vimpydaxpvsk2td.png)

You can [view the course](https://nextjs.org/learn/dashboard-app/getting-started).

---

## 2. Handling 404 Errors

This is how you can use it with the file structure.

![not-found](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jgatxe24sz6zioniii6n.png)

&nbsp;

You can cover the edge cases where the page is not found.

For the below code, it triggers that `not-found` page when the route is not handled.

```typescript
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { updateInvoice } from '@/app/lib/actions';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);
 
  if (!invoice) {
    notFound();
  }
 
  // ...
}
```

&nbsp;

If you include the below code in `not-found.tsx`.

```typescript
import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
 
export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested invoice.</p>
      <Link
        href="/dashboard/invoices"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
```

Accessing a not-handled case will trigger a 404 error and show the above contents.

![not found](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8ho58h85p0s4fk6l93wt.png)

&nbsp;

I've used it before, and the conventions changed slightly after the latest version update. For instance, I made this screen in my past project.

![not found](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8lsd2m46jj745k5pzy68.png)
<figcaption> This is truly awesome! </figcaption>

&nbsp;

You can read on the [official docs](https://nextjs.org/learn/dashboard-app/error-handling#handling-404-errors-with-the-notfound-function).

---

## 3. Plugin to improve Accessibility practices.

Accessibility is truly important, and Google even uses the concept of the Next Billion Users corresponding to that.

This is one of the most useful plugins that I've found so far.

By default, Next.js includes the [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) plugin to help catch accessibility issues early. For example, this plugin warns if you have images without alt text, use the aria-* and role attributes incorrectly, and more.

This will be used with the ESLint command `npm run lint`. Make sure it is configured in `package.json`.

For instance, if we miss an alt prop with `Image` then the below error is shown after using Lint. With Nextjs 14, it is a default so only the aria attributes will be useful with the plugin.

```typescript
45:25  Warning: Image elements must have an alt prop,
either with meaningful text, or an empty string for decorative images. jsx-a11y/alt-text
```

You can read more on the [npm package](https://www.npmjs.com/package/eslint-plugin-jsx-a11y).

---

## 4. The concept of debouncing.

This is one of the most exciting concepts that I've seen so far.
Trust me, I'm not exaggerating.

Debouncing is a programming practice that limits the rate at which a function can fire.

### How debouncing works

1. **Trigger Event**: 
When an event that should be debounced (like a keystroke in the search box) occurs, a timer starts.

2. **Wait**: 
If a new event occurs before the timer expires, the timer is reset.

3. **Execution**: 
If the timer reaches the end of its countdown, the debounced function is executed.

You can implement debouncing in a few ways, including manually creating your own debounce function. To keep things simple, we'll use a library `use-debounce`.

```typescript
// Importing the useDebouncedCallback
import { useDebouncedCallback } from 'use-debounce';
 
// Inside the Search Component...
// Creating a debounced search function
const handleSearch = useDebouncedCallback((term) => {
  // Logging the search term
  console.log(`Searching... ${term}`);
 
  // Creating URL parameters
  const params = new URLSearchParams(searchParams);
  // Updating the 'query' parameter with the search term
  if (term) {
    params.set('query', term);
  } else {
    // Removing the 'query' parameter if the search term is empty
    params.delete('query');
  }
  // Updating the URL with the new search parameters
  replace(`${pathname}?${params.toString()}`);
}, 300); // Debouncing the function for 300 milliseconds
```

This function will only run the code after a specific time once the user has stopped typing (300ms).

So, suppose you have to check validation for a form field, then you can use this so that they don't get error warnings even before they finish typing. So Awesome!

You can read more on the [npm package](https://www.npmjs.com/package/use-debounce).

---

## 5. How to use Image component properly in Next.js.

I found this after a long time, and it helped me a lot.

In the recent versions of Next.js, we import the Image component from legacy.

```typescript
import Image from 'next/legacy/image'

// Rather than import Image from 'next/image'
```

It is further optimized and provides an unbelievable number of options.

In this legacy version, it is mandatory to use `width` and `height` so you can specify fixed dimensions.

```typescript
import Image from 'next/legacy/image'
 
export const MyImage = () => {
  return (
    <Image
      src="me.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```

You can use `layout="responsive"` as an attribute so it would be responsive depending upon the width and space of the parent container.

Now, I don't want that. It can get too small so the docs specify one more way to do that.

For instance, if you know your styling will cause an image to be full-width on mobile devices, in a 2-column layout on tablets, and in a 3-column layout on desktop displays, you should include a size property such as the following.

```typescript
import Image from 'next/legacy/image'
const Example = () => (
  <div className="">
    <Image
      src="/example.png"
      layout="fill"
      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
    />
  </div>
)
```

It's again not that flexible, so the following is the perfect solution since we want to modify the dimensions using the Tailwind.

For this, you need `layout="fill"` and the parent container should be `relative`. This way, you can manipulate the dimensions of the image using breakpoints `sm, md, lg...` in the tailwind.

```typescript
<div className="relative h-[50px] w-[50px]">
    <Image
      src="/example.png"
      layout="fill"
      alt="logo"
    />
</div>
```

You can also implement the same thing with video as well.

---

## 6. Using client components in the layout.

A layout is a UI that is shared between multiple routes. On navigation, layouts preserve state, remain interactive, and do not re-render. Layouts can also be nested.

You can define a layout by default exporting a React component from a layout.js file. The component should accept a `children` prop that will be populated with a child layout (if it exists) or a page during rendering.

For instance, this layout will be shared with the `/dashboard` and `/dashboard/settings` pages.

![layout](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/goce66bgdo1exs1jirqx.png)

You can even make a nested layout or even separate different parts of the application with separate layouts.

![nested layout](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x0kgaqx30hkzfouy9oqv.png)

The root layout `app/layout.js` would wrap the dashboard layout `app/dashboard/layout.js`.

![effect](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/670iphr5drsfdsuc4a3y.png)

There is also a concept of [route groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups) which you can read from the official docs. It lets you create different layouts for different parts of the application. 

The most surprising thing is that you can even create multiple root layouts. WOW, Next.js!

So, the problem is that we have to wrap something that uses client components, and since metadata doesn't work in client components it is difficult to add everything in that one single layout component.

You must have heard of AOS Animations. So let's see how we can use it for just the single page layout. I'm not covering how to separate it, which you can read in the route groups that I shared above.

You can make a component for `aos-wrapper.tsx`
```typescript
'use client'

import { useEffect, type ReactNode } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export const AosWrapper = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])

  return <>{children}</>
}
```

You can wrap that like below.

```typescript
import type { Metadata } from 'next'
import '@/styles/globals.css'
import { AosWrapper } from '@/components/aos-wrapper'
import React from 'react'

export const metadata: Metadata = {
  title: '',
  description: '',
}

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <AosWrapper>{children}</AosWrapper>
      </body>
    </html>
  )
}
```

This way, you can use client components inside any layout.

---

## 7. Concept of Templates.

To differentiate from the concept of layouts, templates were created.

Templates are similar to layouts in that they wrap each child layout or page. Unlike layouts that persist across routes and maintain state, templates create a new instance for each of their children on navigation. 

This means that when a user navigates between routes that share a template, a new instance of the component is mounted, DOM elements are recreated, the state is not preserved, and effects are re-synchronized.

Templates are preferred over the layout in many cases such as features that rely on useEffect (e.g. logging page views) and useState (e.g. a per-page feedback form).

Templates can modify how certain features work within your framework. For example, they can control the display of fallback UIs in Suspense Boundaries during page transitions, which layouts cannot do.

![template](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8jtqw0nx59gk69ohhzw4.png)

```typescript
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

// second part
<Layout>
  {/* Note that the template is given a unique key. */}
  <Template key={routeParam}>{children}</Template>
</Layout>
```

In terms of nesting, `template.js` is rendered between a layout and its children.

---

## 8. What happens if one data request is slower than all the others?

Let's simulate a slow data fetch.

```typescript
export async function fetchRevenue() {
  try {
    // We artificially delay a response for demo purposes.
    // Don't do this in production :)
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));
 
    const data = await sql<Revenue>`SELECT * FROM revenue`;
 
    console.log('Data fetch completed after 3 seconds.');
 
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
```

The output in the terminal is.
```
Fetching revenue data...
Data fetch completed after 3 seconds.
```

You have added an artificial 3-second delay to simulate a slow data fetch. The result is that -> your whole page is blocked while the data is being fetched.

> With dynamic rendering, your application is only as fast as your slowest data fetch.

You can solve it using streaming :)

---

## 9. Concept of Streaming.

Let's cover it in brief.

Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.

By streaming, you can prevent slow data requests from blocking your whole page. This allows the user to see and interact with parts of the page without waiting for all the data to load before any UI can be shown to the user.

![streaming](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/e7ba1gwgc6mg8ek1yyg8.png)

Streaming works well with React's component model, as each component can be considered a chunk.

There are two ways you implement streaming in Next.js:

1. At the page level, with the `loading.tsx` file.
2. For specific components, with `<Suspense>`.

```typescript
<Suspense fallback={<RevenueChartSkeleton />}>
   <RevenueChart />
</Suspense>
```

On refreshing the page, we will see the other information almost immediately, while a fallback skeleton is shown for `<RevenueChart>`.

So many concepts are involved so use it after reading about it thoroughly.

You can read on the [official docs](https://nextjs.org/learn/dashboard-app/streaming).

---

## 10. Disabling scroll position when changing route.

By default, Next.js will scroll to the top of the page when navigating to a new route. 

You can disable this behavior by passing `scroll: false` to `router.push()` or `router.replace()`.

For instance, see the example below.
```typescript
'use client'
 
import { useRouter } from 'next/navigation'
 
export default function Page() {
  const router = useRouter()
 
  return (
    <button
      type="button"
      onClick={() => router.push('/dashboard', { scroll: false })}
    >
      Dashboard
    </button>
  )
}
```

---

## 11. Cache and Revalidate with fetch.

As you're aware, Next.js extends the native [`Web fetch() API`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to allow each request on the server to set its own persistent caching semantics.

With this extension, `cache` indicates how a server-side fetch request will interact with the framework's persistent HTTP cache.

```typescript
export default async function Page() {
  // This request should be cached until manually invalidated.
  // Similar to `getStaticProps`.
  // `force-cache` is the default and can be omitted.
  const staticData = await fetch(`https://...`, { cache: 'force-cache' })
 
  // This request should be refetched on every request.
  // Similar to `getServerSideProps`.
  const dynamicData = await fetch(`https://...`, { cache: 'no-store' })
 
  // This request should be cached with a lifetime of 10 seconds.
  // Similar to `getStaticProps` with the `revalidate` option.
  const revalidatedData = await fetch(`https://...`, {
    next: { revalidate: 10 },
  })
 
  return <div>...</div>
}
```

> In case of `force-cache` (default).

If there is a match and it is fresh, it will be returned from the cache.
If there is no match or a stale match, Next.js will fetch the resource from the remote server and update the cache with the downloaded resource.

> In case of `no-store`.

Next.js fetches the resource from the remote server on every request without looking in the cache, and it will not update the cache with the downloaded resource.

```typescript
fetch(`https://...`, { next: { revalidate: false | 0 | number } })
```

- `0` - Prevent the resource from being cached.
- `number` (in seconds) - Specify the resource should have a cache lifetime of at most how many seconds.

You can also do an on-demand revalidation.

The concept of `revalidateTag` only invalidates the cache when the path is next visited. This means calling `revalidateTag` with a dynamic route segment will not immediately trigger many revalidations at once. The invalidation only happens when the path is next visited.

You can use it like below.

```typescript
revalidateTag(tag: string): void;
```

You can read the [docs](https://nextjs.org/docs/app/api-reference/functions/revalidateTag) that covers it in deep.

Next.js has a cache tagging system for invalidating fetch requests across routes.
In case you're wondering about `Tag`.

`Tag` is a string representing the cache tag associated with the data you want to revalidate. 

You can then revalidate this `fetch` call tagged with `collection` by calling `revalidateTag` in a Server Action.

```typescript
'use server'
 
import { revalidateTag } from 'next/cache'
 
export default async function action() {
  revalidateTag('collection')
}
```

This is how On-Demand Revalidation works.

![On-Demand Revalidation](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j0y58or67iz7mc9oiuk7.png)

If you want to read in deep, you can read about [on-demand revalidation](https://nextjs.org/docs/app/building-your-application/caching#on-demand-revalidation) from official docs.

---

## 12. Absolute Imports and Module Path Aliases.

Next.js has in-built support for the `"paths"` and `"baseUrl"` options of `tsconfig.json` and `jsconfig.json` files.

These options allow you to alias project directories to absolute paths, making it easier to import modules.

```typescript
// Before
import { Button } from '../../../components/button'
 
// after
import { Button } from '@/components/button'
```

For instance, in `tsconfig.json`.
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"]
    }
  }
}
```

The `baseUrl` configuration option allows you to import directly from the root.

Now you can import the module using `@/components/...`

```typescript
import Button from '@/components/button'
 
export default function HomePage() {
  return (
    <>
      <h1>Hello World</h1>
      <Button />
    </>
  )
}
```

Each of the `"paths"` is relative to the `baseUrl` location.

```json
// tsconfig.json or jsconfig.json
{
  "compilerOptions": {
    "baseUrl": "src/",
    "paths": {
      "@/styles/*": ["styles/*"],
      "@/components/*": ["components/*"]
    }
  }
}
```

This is how you can use imports after specifying that.
```typescript
// pages/index.js
import Button from '@/components/button'
import '@/styles/styles.css'
import Helper from 'utils/helper'
```

---

Can you tell what concept this represents?

```typescript
import type { Route } from 'next'
import Link from 'next/link'
 
function Card<T extends string>({ href }: { href: Route<T> | URL }) {
  return (
    <Link href={href}>
      <div>My Card</div>
    </Link>
  )
}
```

Also, let me know in the comments how you can style active links without using CSS in next.js?

---

I think it will take weeks if we have to study every single thing about Next.js docs. I've pretty much gone in deep. But there is still a lot to learn, and I personally don't think it's feasible.

It's just as simple as searching and using docs as needed.

So, did you like this post? Let me know in the comments.
Which point is most surprising to you?

I write by researching thoroughly and sharing my experiences. You can support me by [sponsoring me on GitHub](https://github.com/sponsors/Anmol-Baranwal).

Please please follow me on [GitHub](https://github.com/Anmol-Baranwal) & [Twitter](https://twitter.com/Anmol_Codes) :)

> If you are keen on sponsoring this post, shoot me a message at anmolbaranwal119@gmail.com or hit me up on Twitter! 🚀

{% embed https://github.com/Anmol-Baranwal %}

Write more, inspire more.

![Ending GIF waving goodbye](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2ylsck6b9c7ei6makpqd.gif)    
  