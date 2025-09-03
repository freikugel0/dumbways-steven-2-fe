export const About = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold">About This App</h1>
      <p>
        This app was built as a practice project for React Router DOM basics.
      </p>
      <p>
        <strong>Goal:</strong> learn fundamental routing concepts before moving
        on to more advanced routers.
      </p>
      <p>
        The posts data is fetched from{" "}
        <a className="text-blue-400 underline" href="https://dummyjson.com">
          dummyjson.com
        </a>
        .
      </p>
    </div>
  );
};
