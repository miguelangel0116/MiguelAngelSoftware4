using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BDFIREBASE.Models
{
    public class Producto
    {
        public string IdProducto { get; set; }
        public string Nombre { get; set; }
        public string Precio { get; set; }
        public string Descripcion { get; set; }

        public string Categoria { get; set; }
        public string Marca { get; set; }


    }
}