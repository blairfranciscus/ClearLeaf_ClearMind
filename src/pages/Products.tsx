import { useState } from "react";
import { teas, packs, money, type Tea } from "../content";
import { PageIntro, Sachet, Quantity, PageLink } from "../components";
import { useCart } from "../cart";
function Product({ tea }: { tea: Tea }) {
  const [packId, setPackId] = useState(packs[0].id),
    [quantity, setQuantity] = useState(1);
  const pack = packs.find((p) => p.id === packId)!;
  const { add } = useCart();
  return (
    <article id={tea.id} className="product" aria-label={tea.name}>
      <div className="product-art" style={{ backgroundColor: tea.colour }}>
        <Sachet tea={tea} />
      </div>
      <div className="product-content">
        <p className="eyebrow">{tea.flavour}</p>
        <h2>{tea.name}</h2>
        <p>{tea.description}</p>
        <label className="field-label" htmlFor={`pack-${tea.id}`}>
          Choose your pack
        </label>
        <select
          id={`pack-${tea.id}`}
          value={packId}
          onChange={(e) => setPackId(e.target.value)}
        >
          {packs.map((p) => (
            <option value={p.id} key={p.id}>
              {p.name} · {p.sachets} sachets · {money(p.cents)}
            </option>
          ))}
        </select>
        <div className="product-actions">
          <Quantity value={quantity} onChange={setQuantity} label={tea.name} />
          <button
            type="button"
            className="button"
            onClick={() => add(tea, pack, quantity)}
          >
            Add to cart <span aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    </article>
  );
}
export default function Products() {
  return (
    <div className="wrap page-content">
      <PageIntro
        label="Our Products"
        title={
          <>
            Pick your
            <br />
            <em>tea-break companion.</em>
          </>
        }
      >
        <p>
          Berrylicious, Mint Study or Lemon Myrtle. Three flavours in our
          original botanical sachets.
        </p>
      </PageIntro>
      <div className="concept-note">
        <span aria-hidden="true">♡</span>
        <p>
          Concept store. Prices below are proposed AUD prices from our project;
          your cart is for exploring the collection. No payment or checkout.
        </p>
      </div>
      <div className="product-list">
        {teas.map((tea) => (
          <Product key={tea.id} tea={tea} />
        ))}
      </div>
      <div className="next-step">
        <p>Happy with your picks?</p>
        <PageLink href="./cart.html" secondary>
          Visit My Cart
        </PageLink>
      </div>
      <section
        className="shared-ingredients"
        aria-labelledby="ingredients-title"
      >
        <h2 id="ingredients-title">Ingredients</h2>
        <p>
          Camellia sinensis wholeleaf powder (natural caffeine and L-theanine),
          sodium, potassium, coconut water and natural flavours (varying between
          daytime and nighttime varieties).
        </p>
        <p>
          Wholeleaf tea forms the base, sodium and potassium are included as
          electrolytes, and coconut water and natural flavours round out the
          blend.
        </p>
      </section>
    </div>
  );
}
