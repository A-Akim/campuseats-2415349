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



## Week 5
- Tool(s):
  Gemini
- What I asked for:
- How to make the register Page
 
- What I kept, changed or rejected, and why:
None
    
- One thing the AI got wrong and how I fixed it:
  None

## Week 6
Tool(s): Gemini
What I asked for:
How to fix the "Add to cart" button not working on VendorPage.
How to move the Digit 9 personal feature (Recently Viewed) from localStorage to Firestore using onSnapshot.
How to resolve a React cascading render error caused by calling setState inside useEffect.
What I kept, changed or rejected, and why:
None
One thing the AI got wrong and how I fixed it:
The AI initially suggested calling setRecentlyViewed([]) directly inside the synchronous body of useEffect, which triggered a React cascading renders error. Fixed it by removing setState from the effect body and deriving the value conditionally instead.
  
