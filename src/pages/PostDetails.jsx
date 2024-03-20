import React from "react";
import PostAuther from "../components/PsotAuther";
import { Link } from "react-router-dom";
import Thumbnail1 from "../img/1.png";
function PostDetails() {
  return (
    <section className="post_detail">
      <div className="post-detail_container container">
        <div className="post-detail_header">
          <PostAuther />

          <div className="post-detail_buttons">
            <Link to={"/post/writer/edit"} className="btn sm primary">
              Edit
            </Link>
            <Link to={"/post/writer/delete"} className="btn sm danger">
              Delete
            </Link>{" "}
          </div>
        </div>
        <h1>This is the post title </h1>
        <div className="post-detail_thumblnail">
          <img src={Thumbnail1} alt="Post thumbnail" />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eum
          impedit molestiae non repudiandae labore alias consequatur, sit,
          possimus magnam vitae, corporis perferendis! Nulla voluptates
          aspernatur voluptas numquam accusamus totam, eos quam neque assumenda
          praesentium! Recusandae ad sed necessitatibus animi.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, beatae
          et consequatur cum eius esse eveniet deserunt quas architecto
          voluptate sit fugit fugiat repudiandae voluptates magni dolore odio
          quae iure accusamus doloribus totam fuga atque? Est, dicta eum
          aspernatur quibusdam laborum, tenetur aliquam, molestias ducimus esse
          nobis laboriosam suscipit fugiat quod fuga? Culpa, facilis quo.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
          corrupti aliquam facilis dolorem cumque rem non eos, laborum itaque
          tempora voluptatum ratione iusto ab repellendus dolores nisi
          reprehenderit dicta perferendis velit unde quos consequuntur.
          Repudiandae eveniet ipsum consequuntur fugit? Odit reprehenderit
          facere quasi officia veniam excepturi nobis pariatur modi laborum illo
          ducimus suscipit maxime qui necessitatibus, perferendis placeat sit a
          assumenda accusantium veritatis nostrum eaque exercitationem. Rem et
          consequuntur non rerum magni, ratione alias vitae obcaecati enim
          dolores. Aperiam mollitia incidunt natus itaque. Dignissimos, ab nisi
          asperiores voluptatum aliquid totam reprehenderit, velit, iusto
          quisquam facere cupiditate excepturi non eligendi qui placeat id. Sed
          voluptatum ipsam harum! Laborum iusto quidem quibusdam itaque?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
          voluptates quaerat reiciendis quod quas adipisci. Tempore error,
          dolorem inventore sit distinctio ipsum aliquid aut.
        </p>
      </div>
    </section>
  );
}

export default PostDetails;
