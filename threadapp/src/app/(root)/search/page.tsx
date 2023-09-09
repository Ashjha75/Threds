import Users from "@/app/components/cards/Users";
import { fetchAllUsers, fetchUser } from "@/lib/actions/user.actions";
import { decodeToken } from "@/lib/helpers/tokenData";

const page = async () => {
  const users = await decodeToken();
  const result = await fetchAllUsers({
    userId: users._id,
    searchString: "",
    pageNumber: 1,
    pageSize: 20,
  });

  return (
    <section>
      <h1 className="head-text ml-4 mb-10 text-light-1">Search</h1>
      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No Users</p>
        ) : (
          <>
            {result.users.map((user) => (
              <Users
                key={user._id}
                id={user._id}
                name={user.name}
                image={user.image}
                username={user.username}
                personType="USER"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default page;
