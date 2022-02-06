import EvFuncPreview from './EvFuncPreview';
import EvListPagination from './EvListPagination';
import React from 'react';

const EvPageList = props => {
  if (!props.articles) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.articles.length === 0) {
    return (
      <div className="article-preview">
        No articles are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.articles.map(article => {
          return (
            
            <EvFuncPreview article={article} key={article.slug} /> 
          );
        })
      }

      <EvListPagination
        pager={props.pager}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default EvPageList;
