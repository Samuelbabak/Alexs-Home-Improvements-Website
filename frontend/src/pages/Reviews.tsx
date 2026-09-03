import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const REVIEWS = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    project: 'Deck Construction',
    text: 'Alex did an amazing job on our deck. He was professional, on time, and the quality of the work is top-notch. We love our new outdoor space!',
    rating: 5,
    category: 'Decks',
  },
  {
    id: '2',
    name: 'Mike Roberts',
    project: 'Kitchen Remodel',
    text: 'Highly recommend Alex for any home improvement. Our kitchen looks incredible and the process was seamless. Great attention to detail.',
    rating: 5,
    category: 'Remodels',
  },
  {
    id: '3',
    name: 'Linda Kowalski',
    project: 'Roofing Repair',
    text: 'Fast, reliable, and fair pricing. Alex fixed our roof leak quickly and it\'s been bone dry since. Very happy with the service.',
    rating: 5,
    category: 'Roofs',
  },
  {
    id: '4',
    name: 'David Thompson',
    project: 'Bathroom Upgrade',
    text: 'Professional and efficient. The remodel was finished on time and the quality is exactly what we wanted. Highly recommend!',
    rating: 5,
    category: 'Remodels',
  },
  {
    id: '5',
    name: 'Emily Davis',
    project: 'Deck Repair',
    text: 'Alex fixed our old rotting deck and made it look brand new. He is honest and hardworking. Truly a great local contractor.',
    rating: 5,
    category: 'Decks',
  },
  {
    id: '6',
    name: 'Chris Wilson',
    project: 'Full Exterior Paint',
    text: 'Amazing transformation of our historic home. Alex handled the trim work perfectly. Very satisfied with the outcome.',
    rating: 5,
    category: 'Repairs',
  },
];

const Reviews: React.FC = () => {
  const [filter, setFilter] = React.useState('All');

  const categories = ['All', 'Decks', 'Remodels', 'Roofing', 'Repairs'];

  const filteredReviews = filter === 'All' 
    ? REVIEWS 
    : REVIEWS.filter(r => r.category === filter);

  return (
    <div className="w-full bg-white min-h-screen">
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504307631853-506127f6347b?q=80&w=2070&auto=format&fit=crop" 
            alt="Reviews background" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Customer Love</h1>
          <p className="text-xl text-gray-200">What our neighbors are saying about our work</p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-gold mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} size={32} fill="currentColor" />)}
          </div>
          <h2 className="text-4xl font-bold text-navy mb-4">5.0 Average Rating</h2>
          <p className="text-gray-600 text-lg">100% Customer Satisfaction Guaranteed</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                filter === cat 
                ? 'bg-navy text-white scale-105 shadow-md' 
                : 'bg-gray-100 text-navy hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-navy rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-navy">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.project}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
              </div>
              <p className="text-gray-600 italic leading-relaxed flex-grow">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="bg-navy text-white p-12 rounded-3xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-6">Ready to experience the same quality?</h3>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-4 rounded-md font-bold text-lg hover:bg-white transition-all duration-300"
              >
                Start Your Project <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
