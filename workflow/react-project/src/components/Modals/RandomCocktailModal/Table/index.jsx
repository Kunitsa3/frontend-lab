import './style.less';

const Table = ({ randomCocktailDetails }) => (
  <div>
    <div className="recipe-wrapper">
      <p className="cell-border" />
      <p className="cell-border">Ingredient</p>
      <p className="cell-border">Qnty</p>
      <p className="cell-border" />
    </div>
    {randomCocktailDetails?.ingredientsDetails?.map((ingredientDetails, index) => {
      return (
        <div className="recipe-wrapper" key={index}>
          <p className="cell-border">{index + 1}</p>
          <p className="cell-border justify-content-start">{ingredientDetails?.ingredient}</p>
          <p className="cell-border">{ingredientDetails?.quantity}</p>
          <div className="cell-border">
            <p title={ingredientDetails?.unit}>{ingredientDetails?.unit}</p>
          </div>
        </div>
      );
    })}
  </div>
);

export default Table;
