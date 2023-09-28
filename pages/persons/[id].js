import Layout from '../../components/layout';
import { getAllIds, getData } from '../../lib/data-firebase';


export async function getStaticProps( { params } ) {
  const itemData = await getData(params.id);

  return {
    props: {
      itemData
    }
  };
}


export async function getStaticPaths() {
  const paths = await getAllIds();
  return {
    paths,
    fallback: false
  };
}

export default function Entry({ itemData }) {
  return (
    <Layout>
      <article className="card col-6">
        <div className="card-body">
          <h5 className="card-title">{itemData.name}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{itemData.team}</h6>
          <p className="card-text">Touchdowns: {itemData.TD}</p>
          <p>Interceptions: {itemData.INT}</p>
          <h6>Division</h6>
          {itemData.division && itemData.division.map(
            ({ id, division }) =>
              <p key={id}>
                {division}
              </p>

          )
          }

        </div>
      </article>
    </Layout>
  );
}