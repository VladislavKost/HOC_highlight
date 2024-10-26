import { useState } from "react";
import "./App.css";

function New(props: { children: React.ReactNode }) {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children}
    </div>
  );
}
function Popular(props: { children: React.ReactNode }) {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children}
    </div>
  );
}

function withCategory(Component: any) {
  return function (props: {
    type: string;
    url?: string;
    title?: string;
    views: number;
  }) {
    if (props.views < 100) {
      return (
        <New>
          <Component {...props} />
        </New>
      );
    } else if (props.views > 1000) {
      return (
        <Popular>
          <Component {...props} />
        </Popular>
      );
    } else {
      return <Component {...props} />;
    }
  };
}

function Article(props: {
  type: string;
  url?: string;
  title?: string;
  views: number;
}) {
  return (
    <div className="item item-article">
      <h3>
        <a href="#">{props.title}</a>
      </h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  );
}
function Video(props: {
  type: string;
  url?: string;
  title?: string;
  views: number;
}) {
  return (
    <div className="item item-video">
      <iframe
        src={props.url}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <p className="views">Просмотров: {props.views}</p>
    </div>
  );
}
function List(props: {
  list: Array<{ type: string; url?: string; title?: string; views: number }>;
}) {
  return (
    <>
      {props.list.map((item) => {
        switch (item.type) {
          case "video":
            const WithCategoryVideo = withCategory(Video);
            return <WithCategoryVideo {...item} />;

          case "article":
            const WithCategoryArticle = withCategory(Article);
            return <WithCategoryArticle {...item} />;
        }
      })}
    </>
  );
}

export default function App() {
  const [list, setList] = useState([
    {
      type: "video",
      url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      views: 50,
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      views: 12,
    },
    {
      type: "article",
      title: "Невероятные события в неизвестном поселке...",
      views: 175,
    },
    {
      type: "article",
      title: "Секретные данные были раскрыты!",
      views: 1532,
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      views: 4253,
    },
    {
      type: "article",
      title: "Кот Бегемот обладает невероятной...",
      views: 12,
    },
  ]);

  return <List list={list} />;
}
