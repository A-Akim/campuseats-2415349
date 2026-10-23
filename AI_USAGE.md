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

  
