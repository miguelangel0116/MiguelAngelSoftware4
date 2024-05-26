using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;

using Newtonsoft.Json;

using BDFIREBASE.Models;

namespace BDFIREBASE.Controllers
{
    public class MantenedorController : Controller
    {

        IFirebaseClient cliente;

        public MantenedorController()
        {

            IFirebaseConfig config = new FirebaseConfig
            {
                AuthSecret = "Jt2zfq1Pwn76mH7UERhCaR5KMQDa8W3cbYJXnpJt",
                BasePath = "https://soft4-b9fc0-default-rtdb.firebaseio.com/"
            };

            cliente = new FirebaseClient(config);

        }

        // GET: Mantenedor
        public ActionResult Inicio()
        {

            Dictionary<string, Producto> lista = new Dictionary<string, Producto>();
            FirebaseResponse response = cliente.Get("productos");

            if (response.StatusCode == System.Net.HttpStatusCode.OK)
                lista = JsonConvert.DeserializeObject<Dictionary<string, Producto>>(response.Body);

            List<Producto> listaProducto = new List<Producto>();

            foreach (KeyValuePair<string, Producto> elemento in lista)
            {
                listaProducto.Add(new Producto()
                {
                    IdProducto = elemento.Key,
                    Nombre = elemento.Value.Nombre,
                    Precio = elemento.Value.Precio,
                    Descripcion = elemento.Value.Descripcion,
                    Categoria = elemento.Value.Categoria,
                    Marca = elemento.Value.Marca,

                });
            }

            return View(listaProducto);
        }
        public ActionResult Crear()
        {
            return View();
        }
        public ActionResult Actualizar(string idproducto)
        {
            FirebaseResponse response = cliente.Get("productos/" + idproducto);
            Producto oproducto = response.ResultAs<Producto>();
            oproducto.IdProducto = idproducto;

            return View(oproducto);
        }
        public ActionResult Eliminar(string idproducto)
        {
            FirebaseResponse response = cliente.Delete("productos/" + idproducto);

            return RedirectToAction("Inicio", "Mantenedor");
        }

        [HttpPost]
        public ActionResult Crear(Producto oProducto)
        {
            string IdGenerado = Guid.NewGuid().ToString("N");

            SetResponse response = cliente.Set("productos/" + IdGenerado, oProducto);

            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return RedirectToAction("Inicio", "Mantenedor");
            }
            else
            {
                return View();
            }
        }

        [HttpPost]
        public ActionResult Actualizar(Producto oProducto)
        {

            string idproducto = oProducto.IdProducto;
            oProducto.IdProducto = null;

            FirebaseResponse response = cliente.Update("productos/" + idproducto, oProducto);
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return RedirectToAction("Inicio", "Mantenedor");
            }
            else
            {
                return View();
            }
        }
    }
}