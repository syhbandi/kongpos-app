const Breadcrumb = ({ title }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between">
      <h1 className="text-3xl font-bold mb-6 capitalize">{title}</h1>
    </div>
  );
};

export default Breadcrumb;
