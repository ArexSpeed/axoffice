import {Helmet} from "react-helmet";

const Head = ({title}) => {
  return (
    <div>
      <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta name="description" content="Keep your web places in one app"/>
      </Helmet>
    </div>
  )
}

export default Head
