"use client";

import Image from 'next/image'
import ChipInput from '../components/ChipInput';


const items = [
  { name: 'John Doe', email: 'john@example.com', image: '/profile-img/profile1.jpg' },
  { name: 'Jane Smith', email: 'jane@example.com', image: '/profile-img/profile2.jpg' },
  { name: 'Tom Jones', email: 'tomj@example.com', image: '/profile-img/profile3.jpg' },
  { name: 'Brad Pitt', email: 'brad@example.com', image: '/profile-img/profile4.jpg' },
  { name: 'Angela Bauer', email: 'angela@example.com', image: '/profile-img/profile5.jpg' },
  { name: 'Naina Gupta', email: 'naina@example.com', image: '/profile-img/profile6.jpg' },
  { name: 'Saksham Jain', email: 'saksham@example.com', image: '/profile-img/profile1.jpg' },
  { name: 'Juden Smith', email: 'juden@example.com', image: '/profile-img/profile2.jpg' },
  // Add more items as needed
];


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="p-4">
        <h1 className="text-7xl font-bold mb-4">Pick User</h1>
        <ChipInput items={items} />
      </div>
    </main>
  )
}
