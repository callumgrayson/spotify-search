function Error({ error }) {
  if (error)
    return (
      <div className="error">
        <h4>Oops, something went wrong...</h4>
        <pre>{JSON.stringify(error)}</pre>
      </div>
    );

  return null;
}

export default Error;
