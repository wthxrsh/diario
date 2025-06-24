import React, { useEffect } from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import api from '../lib/axios';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router';


const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const[loading, setLoading] = useState(true);
  const[saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const {id} = useParams();
  
  useEffect(()=>{
    const fetchNote = async() => {
      try{
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      }catch(error){
        console.log("Error fetching note")
        toast.error("Failed to fetch the note")
      }finally{
        setLoading(false);
      }
    };
    fetchNote();
  },[id]);
  console.log({note})

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to DELETE this Emotion?")) return;
    try{
      await api.delete(`/notes/${id}`)
    toast.success("Emotion Deleted")
    navigate("/")
    }catch(error){
      console.log("Error deleting the Emotion: ",error)
      toast.error("Failed to delete Emotion")
    }
  }
  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please fill all the fields")
    }
    setSaving(true);
    try{
      await api.put(`/notes/${id}`, note)
      toast.success("Emotion updated successfully!");
      navigate("/")
  }catch(error){
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
  } finally {
        setSaving(false);
    }
  }

  if(loading){
    return(
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
      <LoaderIcon className='animate-spin size-10' />
    </div>
    )
    
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className="max-w-2xl mx-auto">
          <div className='flex items-center justify-between mb-6'>
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className='h-5 w-5' />
            Back to Home
          </Link>
          <button onClick={handleDelete} className='btn bg-red-200 border-red-300 btn-outline'>
            <Trash2Icon className='h-5 w-5' />
            Delete Emotion
          </button>
        </div>
        <div className='card bg-base-100'>
          <div className="card-body">
            <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">I am feeling...</span>
                </label>
                <input
                  type="text"
                  placeholder="Update your Emotion (e.g. Happy, Sad)"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Because...</span>
                </label>
                <textarea
                  placeholder="Enter the reason for your emotion"
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>
              <div className='card-actions justify-end'>
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                  {saving? "Saving...": "Save Changes"}
                </button>
              </div>
          </div>
        </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default NoteDetailPage
