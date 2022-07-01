import { useState, useEffect } from "react";

export const Dashboard = () => {
  let data_ = [];
  const [token, setTokenJson] = useState();
  function setToken() {
    let obj_token = {
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY1MzEwNDg2NCwibmJmIjoxNjUzMTA0ODY0LCJqdGkiOiJmS0l6QTM4RW51a2dqYVNiIiwic3ViIjo1OCwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.bCTrLRKVZOTj2__1H8zl2tkyLMK8isoKycvPDcaHV-4",
    };
    localStorage.setItem("tokenJson", JSON.stringify(obj_token.token));
  }
  function getToken() {
    data_ = JSON.parse(localStorage.getItem("tokenJson"));
    console.log(data_);
    // setTokenJson(JSON.parse(localStorage.getItem("tokenJson")));
    // console.log(token);
  }
  function removeToken() {
    window.localStorage.removeItem("tokenJson");
  }

  function readyToken() {
    console.log(data_);
  }

  useEffect(() => {
    // data_ && console.log(data_);
  });

  return (
    <>
      <button
        type="button"
        className="px-4 py-2 rounded-lg bg-[#ffc90d] border border-[#ffc90d]  flex items-center gap-3 hover:bg-[#d7ae18] hover:border-[#d7ae18] w-full md:w-fit justify-center"
        onClick={setToken}
      >
        Set Token
      </button>
      <button
        type="button"
        className="px-4 py-2 rounded-lg bg-[#ffc90d] border border-[#ffc90d]  flex items-center gap-3 hover:bg-[#d7ae18] hover:border-[#d7ae18] w-full md:w-fit justify-center"
        onClick={getToken}
      >
        Get Token
      </button>
      <button
        type="button"
        className="px-4 py-2 rounded-lg bg-[#ffc90d] border border-[#ffc90d]  flex items-center gap-3 hover:bg-[#d7ae18] hover:border-[#d7ae18] w-full md:w-fit justify-center"
        onClick={removeToken}
      >
        Remove Token
      </button>
      <button
        type="button"
        className="px-4 py-2 rounded-lg bg-[#ffc90d] border border-[#ffc90d]  flex items-center gap-3 hover:bg-[#d7ae18] hover:border-[#d7ae18] w-full md:w-fit justify-center"
        onClick={readyToken}
      >
        Ready Token
      </button>
      <div className="rounded-lg bg-white shadow-lg p-5">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
          dolorem assumenda aperiam, ipsa, rem veritatis eveniet inventore
          dignissimos illo optio esse, vero explicabo repudiandae quis fugit
          minima suscipit nihil accusantium?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur
          ratione quas adipisci totam nemo commodi. Porro nulla fugiat maxime
          sint, doloremque explicabo ratione aperiam voluptate omnis ad dolores
          perspiciatis atque?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          nesciunt nam, impedit et quod beatae eius facilis cumque deserunt
          sequi voluptatem itaque temporibus adipisci consectetur
          necessitatibus, odit nostrum perspiciatis! Expedita?
        </p>
      </div>
      <div className="rounded-lg bg-white shadow-lg p-5">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
          dolorem assumenda aperiam, ipsa, rem veritatis eveniet inventore
          dignissimos illo optio esse, vero explicabo repudiandae quis fugit
          minima suscipit nihil accusantium?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur
          ratione quas adipisci totam nemo commodi. Porro nulla fugiat maxime
          sint, doloremque explicabo ratione aperiam voluptate omnis ad dolores
          perspiciatis atque?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          nesciunt nam, impedit et quod beatae eius facilis cumque deserunt
          sequi voluptatem itaque temporibus adipisci consectetur
          necessitatibus, odit nostrum perspiciatis! Expedita?
        </p>
      </div>
      <div className="rounded-lg bg-white shadow-lg p-5">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
          dolorem assumenda aperiam, ipsa, rem veritatis eveniet inventore
          dignissimos illo optio esse, vero explicabo repudiandae quis fugit
          minima suscipit nihil accusantium?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur
          ratione quas adipisci totam nemo commodi. Porro nulla fugiat maxime
          sint, doloremque explicabo ratione aperiam voluptate omnis ad dolores
          perspiciatis atque?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          nesciunt nam, impedit et quod beatae eius facilis cumque deserunt
          sequi voluptatem itaque temporibus adipisci consectetur
          necessitatibus, odit nostrum perspiciatis! Expedita?
        </p>
      </div>
      <div className="rounded-lg bg-white shadow-lg p-5">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
          dolorem assumenda aperiam, ipsa, rem veritatis eveniet inventore
          dignissimos illo optio esse, vero explicabo repudiandae quis fugit
          minima suscipit nihil accusantium?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur
          ratione quas adipisci totam nemo commodi. Porro nulla fugiat maxime
          sint, doloremque explicabo ratione aperiam voluptate omnis ad dolores
          perspiciatis atque?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          nesciunt nam, impedit et quod beatae eius facilis cumque deserunt
          sequi voluptatem itaque temporibus adipisci consectetur
          necessitatibus, odit nostrum perspiciatis! Expedita?
        </p>
      </div>
      <div className="rounded-lg bg-white shadow-lg p-5">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
          dolorem assumenda aperiam, ipsa, rem veritatis eveniet inventore
          dignissimos illo optio esse, vero explicabo repudiandae quis fugit
          minima suscipit nihil accusantium?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur
          ratione quas adipisci totam nemo commodi. Porro nulla fugiat maxime
          sint, doloremque explicabo ratione aperiam voluptate omnis ad dolores
          perspiciatis atque?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          nesciunt nam, impedit et quod beatae eius facilis cumque deserunt
          sequi voluptatem itaque temporibus adipisci consectetur
          necessitatibus, odit nostrum perspiciatis! Expedita?
        </p>
      </div>
      <div className="rounded-lg bg-white shadow-lg p-5">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
          dolorem assumenda aperiam, ipsa, rem veritatis eveniet inventore
          dignissimos illo optio esse, vero explicabo repudiandae quis fugit
          minima suscipit nihil accusantium?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur
          ratione quas adipisci totam nemo commodi. Porro nulla fugiat maxime
          sint, doloremque explicabo ratione aperiam voluptate omnis ad dolores
          perspiciatis atque?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          nesciunt nam, impedit et quod beatae eius facilis cumque deserunt
          sequi voluptatem itaque temporibus adipisci consectetur
          necessitatibus, odit nostrum perspiciatis! Expedita?
        </p>
      </div>
      <div className="rounded-lg bg-white shadow-lg p-5">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
          dolorem assumenda aperiam, ipsa, rem veritatis eveniet inventore
          dignissimos illo optio esse, vero explicabo repudiandae quis fugit
          minima suscipit nihil accusantium?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur
          ratione quas adipisci totam nemo commodi. Porro nulla fugiat maxime
          sint, doloremque explicabo ratione aperiam voluptate omnis ad dolores
          perspiciatis atque?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          nesciunt nam, impedit et quod beatae eius facilis cumque deserunt
          sequi voluptatem itaque temporibus adipisci consectetur
          necessitatibus, odit nostrum perspiciatis! Expedita?
        </p>
      </div>
      <div className="rounded-lg bg-white shadow-lg p-5">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
          dolorem assumenda aperiam, ipsa, rem veritatis eveniet inventore
          dignissimos illo optio esse, vero explicabo repudiandae quis fugit
          minima suscipit nihil accusantium?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur
          ratione quas adipisci totam nemo commodi. Porro nulla fugiat maxime
          sint, doloremque explicabo ratione aperiam voluptate omnis ad dolores
          perspiciatis atque?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          nesciunt nam, impedit et quod beatae eius facilis cumque deserunt
          sequi voluptatem itaque temporibus adipisci consectetur
          necessitatibus, odit nostrum perspiciatis! Expedita?
        </p>
      </div>
    </>
  );
};
