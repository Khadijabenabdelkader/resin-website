import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Keychain } from "./collections/Keychain";
import { Bookmark } from "./collections/Bookmark";
import { EmptyPocket } from "./collections/EmptyPocket";
import { Packs } from "./collections/Packs";
import { FaRegCopyright } from 'react-icons/fa';

export const Collection = () => {
  const [selectedCollection, setSelectedCollection] = useState(null); 

  const renderContent = () => {
    switch (selectedCollection) {
      case 'keychain':
        return <Keychain />;
      case 'bookmark':
        return <Bookmark />;
      case 'empty-pack':
        return <EmptyPocket />;
      case 'packs':
        return <Packs />;
      default:
        return <Keychain />;
    }
  };

  return (
    <>
      <Navbar />
      <section className="flex flex-row p-11 m-11">
        <aside className="flex flex-col">
          <h1 className="text-2xl">Collections</h1>
          <Link to="#" onClick={() => setSelectedCollection('keychain')} className="text-gray-600">
            <h2>Keychain</h2>
          </Link>
          <Link to="#" onClick={() => setSelectedCollection('bookmark')} className="text-gray-600">
            <h2>Bookmark</h2>
          </Link>
          <Link to="#" onClick={() => setSelectedCollection('empty-pack')} className="text-gray-600">
            <h2>Empty Pocket</h2>
          </Link>
          <Link to="#" onClick={() => setSelectedCollection('packs')} className="text-gray-600">
            <h2>Packs</h2>
          </Link>
        </aside>
        <div className="border-l-2 border-gray-600 mx-9"></div>
        <div className="flex-grow">
          {renderContent()}
        </div>
      </section>

      <footer className="fixed bottom-0 left-0 w-full bg-white flex items-center justify-between py-2 px-4">
        <div className="flex-shrink-0">
          <a href="https://www.instagram.com/we_aime_art_by_wiem/?hl=fr" target="_blank" rel="noopener noreferrer" className="text-gray-700">
            <ion-icon name="logo-instagram" size=""></ion-icon>
          </a>
        </div>
        <div className="flex items-center justify-center flex-grow text-gray-700">
          <span>
            2024 <FaRegCopyright className="inline mx-1" /> We Aime Art. All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};
export default Collection;
