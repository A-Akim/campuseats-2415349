const vendors = [
 {
 id: 'krusty-krab',
 name: 'Krusty Krab',
 location: 'Mahallah Ali, Ground Floor',
 openHours: '10:00 am - 10:00 pm',
 isOpen: true,
 menu: [
 { id: 'krusty-1', name: 'Krabby Patty', description: 'Burger with a secret formula', price: 6, category: 'Burgers',
available: true },
 { id: 'krusty-2', name: 'Kelp Shake', description: 'A refreshing drink made with kelp', price: 2.5, category:
'Drinks', available: true },
 { id: 'krusty-3', name: 'Kelp Salad', description: 'A refreshing salad made with kelp', price: 4, category:
'Sides', available: false },
 ],
 },
 {
 id: 'kafe-aminah',
 name: 'Kafe Mahallah Aminah',
 location: 'Mahallah Aminah, Ground Floor',
 openHours: '8:00 am - 9:00 pm',
 isOpen: true,
 menu: [
 { id: 'ami-1', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken with sambal and rice', price: 9, category: 'Rice', available: true },
 { id: 'ami-2', name: 'Air Bandung', description: 'Rose syrup with milk', price:
3, category: 'Drinks', available: true },
 ],
 },
]
export default vendors