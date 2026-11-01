# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s):
Gemini
- What I asked for:
I asked how to fix an error stating the remote contained work I did not have locally. After running git pull, I got stuck in a terminal text editor with a merge message, so I asked how to exit it.
- What I kept, changed or rejected, and why:
I use Esc + :wq + Enter, then git push.
- One thing the AI got wrong and how I fixed it:
None

## Week 2
- Tool(s):
  None
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:


## Week 3: 

- Tools Used: Gemini 

- What I Asked:
  - Fixing JSON syntax errors and ask what is trailing comma rules in vendors.json.
  - Setting up data fetching in App.jsx using useEffect, AbortController, loading states, and error retry logic.
  - building CartPage.jsx, CartItem.jsx, and CheckoutForm.jsx with full field validation.
  - How to fix a React warning about performance loops caused by updating state inside an effect.
  - How to build the personal feature 'Recently Viewed items' with no duplicates, newest first, a maximum 5 limit, and a clear button.
 
    
- What I Kept or Changed:
  - Kept: The main layout structure, the plus/minus buttons for items, and the form rules for name, mahallah, and pickup time.
  - Changed:Moved the loading and error reset code out of the useEffect body and put it into the "Try again" button instead, and wired up handleViewItem and RecentlyViewed.jsx component props.

- One Thing the AI Got Wrong:
  - The AI originally told me to put setLoading(true) directly inside the useEffect function. This caused React to throw a warning about infinite re-renders, so I had to remove it from there.

## Week 4
- Tool(s):
  Claude, Gemini
- What I asked for:
  - How to set up multi-page navigation using React Router with a shared layout and dynamic vendor routes.
  - How to create custom hooks for localStorage, vendor data fetching, and cart context.
  - How to persist cart, orders, and recently viewed items across page reloads.
  - How to debug router crashes and cart display errors.
 
- What I kept, changed or rejected, and why:
  - The custom hooks, context provider setup, and route structure. existing nested cart item format in CartProvider instead of flat objects so components did not break. Added the missing return statement in checkout validation.
    
- One thing the AI got wrong and how I fixed it:
  - The AI generated CartProvider with a flat data structure instead of my nested item format, causing the cart page to crash when reading prices. Fixed it by updating CartProvider to match item structure and cleared localStorage to wipe incompatible cached data.

---

Own Notes
 week 3:
1. Fixing vendors.json
- What happened: file wouldn't load because it had JavaScript code (const vendors =) and extra commas at the very bottom. JSON is super strict and hates extra commas or code.
- How it fixed: Deleted the 'const' part, wrapped all words and keys in double quotes (""), and removed the last trailing comma.
- Rule to remember: JSON is data only—no code, and no comma on the very last item

2. useEffect & AbortController
- What happened: needed a way to pull menu data from our JSON file when the page opens.
- How it fixed: Used useEffect to fetch the file. also added an AbortController so that if the user closes the page while it's loading, it cancels safely without leaking memory. used a reloadKey trick so the "Try again" button actually reloads the data.

3. Fixing the React Cascading Render Warning
- What happened: React threw an error saying updating state ('setState') directly inside a 'useEffect' body causes bad performance loops.
- How it fixed: Since loading is already set to 'true' when the app first opens, delete 'setLoading(true)' from inside the 'useEffect'. Now, it only resets when someone clicks the "Try again" button.

5. Recently Viewed Feature 
- A history tracker for menu items the user interacted with, ensuring no duplicate entries, showing newest items first, limiting to a maximum of 5, and adding a clear button.
Steps:
  - Create a 'recentlyViewed' state array to store the items.
  - Wrote 'handleViewItem': used '.filter()' to remove any existing copy of the item (preventing duplicates), placed the new item at the very front using the spread operator ('[item, ...filtered]'), and kept only the top 5 using '.slice(0, 5)'.
  - Wrote 'handleClearRecentlyViewed' to reset the list back to an empty array [] when the clear button is clicked.
  - Built a separate 'RecentlyViewed.jsx' component to display the list dynamically and hide itself when empty.
- Rule to remember: Use '.filter()' to drop duplicates, the spread operator (...) to put new items first, and '.slice()' to enforce a maximum length for history logs.

 week 4:
Part 1: How the Main Features Work
- React Router: Splits the app into real URL pages (/ , /cart, /orders, /vendor/:id).
  - BrowserRouter: Manages navigation history.
  - Routes and Route: Maps URLs to page components.
  - Layout and Outlet: Keeps Header and Footer on screen while swapping page content inside Outlet.
  - useParams: Reads dynamic URL values such as vendor IDs.
  - useNavigate: Changes pages programmatically such as redirecting to /orders after checkout.
- Custom Hooks: Moves heavy logic out of UI files into reusable helpers.
  - useLocalStorage: Syncs state with browser storage so data survives page refresh.
  - useVendors: Handles API fetching, loading states, and error handling.
  - useCart: Safely accesses cart data from any component.
- Context API (CartProvider): Eliminates prop drilling by letting components read and update cart data directly instead of passing props through parent components.

Part 2: Problems and Fixes
Problem 1: Blank page (basename is null)
  - Cause: Using Link outside of BrowserRouter when NotFoundPage accidentally replaced App.jsx.
  - Fix: Restored BrowserRouter around the route tree in App.jsx.
Problem 2: Cart crash (cannot read price of undefined)
  - Cause: The new provider saved items in a flat format, while existing components expected nested item and qty objects. Cached bad data in browser storage also kept triggering the crash.
  - Fix: Updated CartProvider to use nested item and qty structure, then cleared old data with localStorage.clear().
Problem 3: React 19 warning (setState inside effect)
  - Cause: Calling setLoading(true) directly inside the useEffect body caused unnecessary cascading renders.
  - Fix: Set initial state to loading true by default, and only reset it inside the manual reload function.
Problem 4: Checkout form did not submit
  - Cause: The validate function forgot to return errors, producing undefined.
  - Fix: Added return errors at the end of the validation function.
Problem 5: Recently Viewed upgrade (Digit 9)
  - Upgrade: Replaced basic useState with useLocalStorage so history persists after refresh, and converted item names into clickable Link tags pointing to the vendor page.
