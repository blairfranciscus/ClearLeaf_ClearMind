import { useCart } from "../cart";
import { teas, packs, money } from "../content";
import { PageIntro, PageLink, Sachet, Quantity } from "../components";
export default function Cart() {
  const { items, count, update, remove, clear, storageUnavailable } = useCart();
  const total = items.reduce(
    (sum, i) => sum + packs.find((p) => p.id === i.packId)!.cents * i.quantity,
    0,
  );
  return (
    <div className="wrap page-content">
      <PageIntro
        label="My Cart"
        title={
          <>
            Your next
            <br />
            <em>tea break.</em>
          </>
        }
      >
        <p>
          {count
            ? `${count} ${count === 1 ? "pack" : "packs"} picked out for your concept cart.`
            : "Let’s find something for your cup."}
        </p>
      </PageIntro>
      {!items.length ? (
        <section className="empty-cart">
          <span className="empty-heart" aria-hidden="true">
            ♡
          </span>
          <h2>Your cart is waiting for tea.</h2>
          <p>Meet the collection and add your favourite flavour.</p>
          <PageLink href="./products.html">Explore our products</PageLink>
        </section>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => {
              const tea = teas.find((t) => t.id === item.teaId)!,
                pack = packs.find((p) => p.id === item.packId)!;
              return (
                <article
                  className="cart-item"
                  key={`${item.teaId}-${item.packId}`}
                  aria-label={`${tea.name} ${pack.name}`}
                >
                  <div
                    className="cart-art"
                    style={{ backgroundColor: tea.colour }}
                  >
                    <Sachet tea={tea} />
                  </div>
                  <div className="cart-item-copy">
                    <h2>{tea.name}</h2>
                    <p>
                      {pack.name} · {pack.sachets} sachets
                    </p>
                    <p>{money(pack.cents)} per pack</p>
                    <div className="cart-item-actions">
                      <Quantity
                        value={item.quantity}
                        onChange={(n) => update(item.teaId, item.packId, n)}
                        label={`${tea.name} ${pack.name}`}
                      />
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => remove(item.teaId, item.packId)}
                      >
                        Remove{" "}
                        <span className="sr-only">
                          {tea.name} {pack.name}
                        </span>
                      </button>
                    </div>
                  </div>
                  <strong className="line-total">
                    {money(pack.cents * item.quantity)}
                  </strong>
                </article>
              );
            })}
            <button className="text-link" type="button" onClick={clear}>
              Empty my cart
            </button>
          </div>
          <aside className="cart-summary">
            <p className="eyebrow">Your tea picks</p>
            <h2>A little recap.</h2>
            <div className="total-row">
              <span>Concept subtotal</span>
              <strong>{money(total)}</strong>
            </div>
            <p>
              Proposed prices in AUD. This is a university concept store; no
              orders or payments are taken.
            </p>
            <p>
              {storageUnavailable
                ? "Your browser could not save this cart. Picks may be lost when you leave this page."
                : "Your picks are saved on this device for next time."}
            </p>
            <PageLink href="./products.html" secondary>
              Keep exploring
            </PageLink>
          </aside>
        </div>
      )}
    </div>
  );
}
