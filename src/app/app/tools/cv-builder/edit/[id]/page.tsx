const EditCvPage = ({ params }: { params: { id: string } }) => {
  const id = Number.parseInt(params.id);
  return <div className="text-5xl h-full w-full">ID: {id}</div>;
};

export default EditCvPage;
