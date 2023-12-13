export const fetchMovieById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/api/films/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching movie with ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching movie with ID ${id}:`, error);
    throw error;
  }
};

export const fetchCinemas = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/cinemas/all");
    if (!response.ok) {
      throw new Error("Error fetching cinemas");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cinemas:", error);
    throw error;
  }
};
