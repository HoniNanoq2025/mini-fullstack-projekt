import styles from "./SearchBar.module.css";

// searchTerm = Present search term, setSearchTerm = function for updating search term
export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    // Container for search field, e.g. in order to center or provide margin
    <div className={styles.container}>
      {/* Input field where user can write search term*/}
      {/* value = searchTerm field is controlled by state */}
      {/* onChange = opdates searchTerm when user is writing */}
      <input
        type="text"
        placeholder="Search for title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.input}
      />
    </div>
  );
}
