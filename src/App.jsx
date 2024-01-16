import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import TaskBoard from "./task/TaskBoard";

function App() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Header></Header>
        <Hero></Hero>
        <TaskBoard></TaskBoard>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
