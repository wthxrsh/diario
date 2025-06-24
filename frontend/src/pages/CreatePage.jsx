import { ArrowLeftIcon } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title.trim() || !content.trim()) {
      toast.error("All fields required");
      return
    }
    setLoading(true)
    try{
      await api.post("http://localhost:5001/api/notes",{
        title,
        content
      })
      toast.success("Note created successfully!");
      navigate("/")
    }catch(error){
      console.log("Error creating note", error);
      if(error.response.status === 429){
        toast.error("Slow down! you're creating notes too fast", {duration:4000, icon:"💀"})
      } else{
        toast.error("Failed to create note");
      }
    }finally{
      setLoading(false)
    }
  }

  return (
  <div className='min-h-screen bg-base-200'>
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <Link to={"/"} className="btn btn-ghost mb-6">
          <ArrowLeftIcon className='size-5' />
          Back to Home..
        </Link>

        <div className='card bg-base-100'>
          <div className='card-body'>
            <h2 className='card-title text-2xl mb-4'>Share what you feel!</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>I am feeling... </span>
                </label>
                <input type="text" placeholder='Enter Your Emotion (e.g. Happy, Sad)' className='input input-bordered' value={title} onChange={(e) => setTitle(e.target.value)}
                />
                </div>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Because... </span>
                </label>
                <textarea placeholder='Enter the reason of your emotion...' className='textarea textarea-bordered h-32' value={content} onChange={(e)=>setContent(e.target.value)} />
                </div>
              <div className='card-actions justify-end'>
                  <button className='btn btn-primary' type='submit' disabled={loading}> {loading? "Sharing..." : "Share "}</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default CreatePage
