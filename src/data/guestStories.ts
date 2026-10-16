// Add real guest photos here after faces have been blurred in the image file.
// Keep permission-cleared photos in public/assets/guests/ and reference /assets/guests/filename.jpg.
// The photo ribbon shows images only. Optional metadata is retained for future use.
export interface GuestStory {
  id: string;
  imageUrl: string;
  imageAlt: string;
  location: string;
  landscape?: boolean;
  scooterName?: string;
  guestLabel?: string;
  quote?: string;
}
export const GUEST_STORIES: GuestStory[] = [
  {id:'guest-1',imageUrl:'/assets/guests/guest-1.jpg',imageAlt:'Guests with their rental scooter, faces and plates blurred',location:''},
  {id:'guest-2',imageUrl:'/assets/guests/guest-2.jpg',imageAlt:'Scooter handover with a guest, faces and plates blurred',location:''},
  {id:'guest-3',imageUrl:'/assets/guests/guest-3.jpg',imageAlt:'Group of six with rental scooters, faces and plates blurred',location:'',landscape:true},
  {id:'guest-4',imageUrl:'/assets/guests/guest-4.jpg',imageAlt:'Scooters ready for guests, faces and plates blurred',location:''},
  {id:'guest-5',imageUrl:'/assets/guests/guest-5.jpg',imageAlt:'Guest scooter delivery, faces and plates blurred',location:''},
  {id:'guest-6',imageUrl:'/assets/guests/guest-6.jpg',imageAlt:'Two guests with a scooter, faces and plates blurred',location:''},
  {id:'guest-7',imageUrl:'/assets/guests/guest-7.jpg',imageAlt:'Couple with their rental scooter, faces and plates blurred',location:''},
];



