# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
Imperative need us to write every step to update page, while declarative lets us describe the ui and React will handle the update.

3. Why must a component name start with a capital letter?
so React know the difference between html tags or custom components.

5. What does a fragment <>...</> do, and why not just use a <div>?
Fragments let us group multiple element without adding wrapper tag that can mess current css layout.

6. Name one benefit of splitting the UI into small components.
easier to reuse and keep project organized.


# Week 6 reflection
1 Explain, step by step, what happens from the moment you click Place order until the new order appears on your Orders page. Name the functions in your own code that run, and say why you never call setOrders yourself.

Clicking "Place order" runs handleSubmit in CheckoutForm.jsx, which validates the input and calls handlePlaceOrder in CartPage.jsx. Next, placeOrders in src/services/orders.js groups the items by vendor and saves the new documents to Firestore using a writeBatch. After clearCart() runs and navigate('/orders') redirects the user, the useMyOrders hook executes subscribeToMyOrders to set up an onSnapshot listener. We never call setOrders manually because Firestore's onSnapshot automatically detects the new database write and updates the state for us in real time.

2 Why is orders a top-level collection, and why does each order copy vendorName and each item’s name and price instead of storing only IDs?

orders is a top-level collection so both students (by studentUid) and vendors (by vendorId) can query orders directly using simple where() clauses. If orders were nested inside a user or vendor subcollection, the other party could not easily read or manage them. We copy vendorName, item names, and prices directly into the order document to preserve an accurate historical receipt if a vendor later changes prices or deletes items. This denormalization also allows the entire order to be displayed in a single Firestore read without needing relational joins.

3 Your personal feature: which Firestore path and fields hold its data, and which line of your code reads it? Paste that line.

Path: recent/{uid}
Fields: items (array of objects with id, name, price, vendorId, vendorName)
Code line:
return onSnapshot(doc(db, 'recent', uid), (snap) => onData(snap.exists() ? (snap.data().items ?? []) : []))
