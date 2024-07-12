import Pagination from "react-bootstrap/Pagination";

function PaginationCustom({ start = 1, end, active, onActive }) {
  console.log("🚀 ~ PaginationCustom ~ end:", end);
  let items = [];
  for (let number = 1; number <= end; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => onActive(number)}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
}

export default PaginationCustom;
