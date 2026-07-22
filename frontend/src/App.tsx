import { useState } from "react";
import axios from "axios";

function App() {

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);



  const uploadImage = async () => {

    if (!file) {
      alert("Please select an image");
      return;
    }


    setLoading(true);
    setResult(null);


    const formData = new FormData();

    formData.append("image", file);



    try {

      const upload = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );


      const id = upload.data.processingId;



      const interval = setInterval(async () => {


        const res = await axios.get(
          `http://localhost:5000/api/images/${id}`
        );



        if(res.data.status === "completed") {

          clearInterval(interval);

          setResult(res.data);

          setLoading(false);

        }


      },2000);



    } catch(error) {

      console.log(error);

      alert("Upload Failed");

      setLoading(false);

    }

  };



  const analysis = result?.analysis;



  return (

<div className="container py-5">


{/* Header */}

<div className="text-center mb-5">


<h1 className="fw-bold text-primary">

📷 GoGig AI Image Intelligence

</h1>


<p className="text-muted">

AI Powered Image Analysis Platform

</p>


</div>





{/* Upload */}

<div className="card shadow border-0 p-4">


<h4>

Upload Image

</h4>



<input

type="file"

className="form-control"

accept="image/*"

onChange={(e)=>{


if(!e.target.files)

return;


setFile(e.target.files[0]);


setPreview(

URL.createObjectURL(

e.target.files[0]

)

);


setResult(null);


}}


/>




<button

className="btn btn-primary mt-3"

onClick={uploadImage}

>

🚀 Analyze Image

</button>


</div>







{/* Preview */}


{preview &&


<div className="card shadow border-0 mt-4">


<div className="card-header bg-dark text-white">

🖼️ Image Preview

</div>



<div className="card-body text-center">


<img

src={preview}

className="img-fluid rounded"

style={{

maxHeight:"420px"

}}

/>


</div>


</div>


}






{/* Loading */}


{loading &&


<div className="text-center mt-5">


<div className="spinner-border text-primary"/>



<h4 className="mt-3">

Processing Image...

</h4>


<p className="text-muted">

Analyzing image quality and extracting text

</p>


</div>


}






{/* Result */}


{result &&


<div className="mt-5">



<h2 className="text-success mb-4">

📊 Image Analysis Report

</h2>





<div className="card shadow border-0">


<div className="card-body">



<ReportItem

icon="✅"

title="Status"

value="Completed"

/>


<hr/>




<ReportItem

icon="📄"

title="File Name"

value={result.image.originalName}

/>



<hr/>




<ReportItem

icon="📐"

title="Resolution"

value={`${analysis.width} × ${analysis.height}`}

/>



<hr/>




<ReportItem

icon="💡"

title="Brightness"

value={
Number(
analysis.averageBrightness
).toFixed(1)
}

/>



<hr/>




<ReportItem

icon="🔍"

title="Blur Detection"

value={
analysis.blurry
?
"❌ Blurry Image"
:
"✅ Sharp Image"
}

/>



<hr/>




<ReportItem

icon="🌙"

title="Lighting Condition"

value={
analysis.lowLight
?
"⚠️ Low Light"
:
"✅ Good Lighting"
}

/>



<hr/>




<ReportItem

icon="📝"

title="OCR Confidence"

value={
`${(
analysis.confidence*100
).toFixed(0)}%`
}

/>



</div>


</div>








{/* OCR */}


<div className="card shadow border-0 mt-4">


<div className="card-header bg-primary text-white">

📝 Detected Text from Image

</div>




<div className="card-body">


<p className="text-muted">

Text extracted using OCR technology

</p>



<p className="text-secondary">

ℹ️ OCR accuracy depends on image quality and text clarity.

</p>





<textarea

className="form-control"

rows={10}

readOnly

value={

analysis.ocrText

?

analysis.ocrText.slice(0,500)

:

"No text detected"

}


/>





{

analysis.ocrText?.length > 500 &&


<p className="text-primary mt-2">

...More text detected in image

</p>


}



</div>


</div>





</div>

}





<footer className="text-center text-muted mt-5">


Powered by React • Node.js • BullMQ • Sharp • Tesseract OCR


</footer>




</div>


  );

}







function ReportItem({

icon,

title,

value

}:any){


return (

<div className="d-flex align-items-center">


<div

style={{

fontSize:"28px",

width:"55px"

}}

>

{icon}

</div>




<div>


<h6 className="text-muted mb-1">

{title}

</h6>



<h5 className="mb-0">

{value}

</h5>



</div>



</div>


);


}



export default App;