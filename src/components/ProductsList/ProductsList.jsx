import CategoryProducts from "../../components/CategoryProducts/CategoryProducts";
import { v4 as uuidv4 } from "uuid";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-scroll";
import queryHooks from "../hooks/queryHooks";
import "./ProductsList.scss";

const ProductsList = () => {
  let categories;
  let filters;

  const { data, status } = queryHooks.useGetCategories();

  if (status === "success") {
    categories = data.data;
    filters = categories.map((category) => {
      return {
        id: uuidv4(),
        name: category.name,
        filter: category.id,
        active: false,
      };
    });
  }

  return (
    <section className="products-list">
      <ListGroup className="products-list-filter" horizontal>
        {filters?.map((item) => (
          <ListGroup.Item key={item.id}>
            <Link
              activeClass="active"
              className="alink"
              to={item.filter}
              spy={true}
              smooth={true}
              containerId="products-list-category"
              duration={300}
              offset={-100}
            >
              {item.name}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <section className="products-list-category" id="products-list-category">
        {categories?.map((category) => {
          return (
            <CategoryProducts
              category={category}
              key={category.id}
              name={category.id}
            />
          );
        })}
      </section>
    </section>
  );
};

export default ProductsList;
