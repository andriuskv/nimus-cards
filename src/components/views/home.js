import React from "react";
import { Link } from "react-router";
import Container from "./container";

export default function Home() {
    return (
        <Container>
            <div className="home">
                <section className="home-main">
                    <h2 className="container container-title home-main-title">About NimusCards</h2>
                    <article className="container home-main-desc">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec sodales laoreet velit, vel consequat purus vulputate ut.
                            In ornare dolor ut maximus ultrices. Nullam posuere velit eleifend ligula
                            consectetur lobortis. Vivamus fringilla blandit ante, id ornare velit varius nec.
                        </p>
                        <p>
                            Vivamus tempus tellus et leo accumsan, sit amet lacinia dolor sodales.
                            Sed ligula neque, tempor at justo vitae, consectetur lacinia nibh.
                            Proin viverra auctor nibh sit amet mollis.
                        </p>
                        
                        <p>
                            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                            Curae; Aenean condimentum venenatis mi, vel pellentesque ipsum. Etiam eu neque sapien.
                        </p>
                    </article>
                </section>
                <aside className="container home-aside">
                    <p>Make new set</p>
                    <Link to="flashcards/create" className="btn">Create Set</Link>
                </aside>
            </div>
        </Container>
    );
}
