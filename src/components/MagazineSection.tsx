import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowLeft, X, User } from 'lucide-react';
import { Article } from '../types';
import { ARTICLES } from '../data/articles';

export const MagazineSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="rad-magazine" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[#7A1C2C] rounded-full" />
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            مجله تخصصی رادبیوتی
          </h2>
        </div>
        <span className="text-xs text-stone-500 font-medium hidden sm:inline-block">
          راهنمای سلامت، روتین پوستی و تشخیص اصالت کالا
        </span>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ARTICLES.map((article) => (
          <article
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="group bg-white rounded-3xl border border-stone-200/80 hover:border-rose-300 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              {/* Image banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-xl bg-white/95 text-stone-800 backdrop-blur-xs shadow-xs">
                  {article.category}
                </span>
              </div>

              {/* Text content */}
              <div className="p-5">
                <div className="flex items-center gap-3 text-[11px] text-stone-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug mb-2 group-hover:text-[#7A1C2C] transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </div>

            {/* Read more button */}
            <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-stone-100 mt-2">
              <span className="text-[11px] text-stone-400 font-medium">
                {article.author}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#7A1C2C] group-hover:gap-2 transition-all">
                <span>مطالعه کامل</span>
                <ArrowLeft className="w-4 h-4" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div 
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
          />

          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 animate-in zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 left-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              aria-label="بستن مقاله"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-bold text-[#7A1C2C] bg-rose-50 px-3 py-1 rounded-lg">
                {selectedArticle.category}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug mb-4">
              {selectedArticle.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-stone-500 mb-6 pb-4 border-b border-stone-200">
              <span className="flex items-center gap-1.5 font-medium">
                <User className="w-4 h-4 text-stone-400" />
                {selectedArticle.author}
              </span>
              <span>•</span>
              <span>{selectedArticle.date}</span>
              <span>•</span>
              <span>زمان مطالعه: {selectedArticle.readTime}</span>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-stone-100">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-stone-700 text-sm leading-loose whitespace-pre-line space-y-4">
              {selectedArticle.content}
            </div>

            <div className="mt-8 pt-4 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-[#7A1C2C] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#641423] cursor-pointer"
              >
                بستن و ادامه خرید
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
