using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RotateMatrix.Core.Services;

namespace RotateMatrix.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatrixController : ControllerBase
    {
        private readonly IMatrixOperation matrixOperation;
        private readonly IMatrixIO matrixIO;

        public MatrixController(IMatrixOperation matrixOperation, IMatrixIO matrixIO)
        {
            this.matrixOperation = matrixOperation;
            this.matrixIO = matrixIO;
        }

        [HttpGet("[action]")]
        public ActionResult<int[,]> GenerateMatrix(int rank = 2, int minValue = 0, int maxValue = 100)
        {
            return matrixOperation.GenerateMatrix(rank: rank, minValue: minValue, maxValue: maxValue);
        }

        [HttpPost("[action]")]
        public ActionResult<int[,]> RotateLeft(int[,] matrix)
        {
            return matrixOperation.RotateLeft(matrix);
        }

        [HttpPost("[action]")]
        public ActionResult<int[,]> RotateRight(int[,] matrix)
        {
            return matrixOperation.RotateRight(matrix);
        }

        [HttpPost("[action]"), DisableRequestSizeLimit]
        public ActionResult<int[,]> UploadFromFile()
        {
            try
            {
                var file = Request.Form.Files[0];

                if(file != null && file.Length > 0)
                {
                    return matrixIO.Import(file.OpenReadStream());
                }
                else
                {
                    return null;
                }
            }catch(Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("[action]")]
        public ActionResult SaveToFile(int[,] matrix)
        {
            return File(matrixIO.Export(matrix), "application/csv", "matrix.csv");
        }


    }
}