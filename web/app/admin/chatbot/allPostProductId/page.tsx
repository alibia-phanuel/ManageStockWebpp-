import fetchPosts from "@/page/api/facebookApi";
import ClientComponent from "@/components/share/ClientComponent";

const Page = async () => {
  const pageId1 = "389037834288932";
  const pageId2 = "101051433077608";
  const accessTokenPage1 =
    "EAAZASXPS0t6cBO4guVWKP8LA5wGd20IvJkmt8C53HIRnzpFEz31XHjxrdmIT98YaJi25kjRe3zeIJER3N7NToVGxwBelpzZANX1GsZA4uSVTZAc1BDvH2rR7KzPqLjPwMTs6zZBsBv6SKcbPRRCYxkpMIc1iwTjGbNZCo80uCuT53pRyFeUEoMMfbIaMLwGiyBpcP33QZAKVOrM3Jvs";
  const accessTokenPage2 =
    "EAAZASXPS0t6cBO9rZCZBPHK65vQ8SDQ7IhZAtQlVTx8yP4TdXZBoZAav5kLiHevairecIxBhdOrqLdPoXavt6zinnGZCOQdDBGlvMKiCbvlvZA1vkutysZAA3NlGNIePL3REOv3KJjXStHbliKZCxxIhsbShWVN4hCA75v6UNgeYgoCsHZCzDT5DBZCjZA0ffazk82nEbxFZBmBWJGYWBxUusZD";

  const postsPage1 = await fetchPosts(pageId1, accessTokenPage1);
  const postsPage2 = await fetchPosts(pageId2, accessTokenPage2);

  const allPostsOne = postsPage1;
  const allPostsTwo = postsPage2;

  return (
    <>
      <div className=" flex flex-wrap">
        <ClientComponent posts={allPostsOne} numberPage={1} />
        <ClientComponent posts={allPostsTwo} numberPage={2} />
      </div>
    </>
  );
};

export default Page;
