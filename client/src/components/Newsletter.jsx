import { useState } from 'react';
import SafeImage from './SafeImage';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail('');
  };

  return (
    <section id="newsletter" className="container-fasco my-16 md:my-24">
      <div className="grid items-center gap-6 md:grid-cols-[1fr_1.4fr_1fr]">
        <div className="hidden overflow-hidden md:block">
          <SafeImage src="/images/home/news-1.jpg" alt="" className="h-64 w-full object-cover lg:h-80" />
        </div>
        <div className="px-2 text-center md:px-8">
          <h2 className="section-title">Subscribe To Our Newsletter</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-fasco-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem.
            Scelerisque duis ultrices sollicitudin.
          </p>
          <form onSubmit={onSubmit} className="mx-auto mt-8 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="michael@ymail.com"
              className="input-underline text-center shadow-sm"
              required
            />
            <button type="submit" className="btn-primary mt-6 max-w-xs">
              Subscribe Now
            </button>
            {done && <p className="mt-3 text-sm text-green-600">Thanks for subscribing!</p>}
          </form>
        </div>
        <div className="hidden overflow-hidden md:block">
          <SafeImage src="/images/home/news-2.jpg" alt="" className="h-64 w-full object-cover lg:h-80" />
        </div>
      </div>
    </section>
  );
}
