/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package bachir.microblog.restful.webservice;

/**
 *
 * @author Antonio
 */

import bachir.microblog.restful.dao.*;
import bachir.microblog.restful.domain.*;
import java.io.IOException;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/posts")
public class PostsDataService {

	@GET
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public List<Post> getPosts() {
		List<Post> posts = Dao.getPostDao().findAll();
		return posts; 
	}
        @GET
        @Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Post getPostById(@PathParam("id") String personaID) {
                Post p = Dao.getPostDao().findPostById(Long.parseLong(personaID));
		return p; 
	}
        
        @POST
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public void newUser(Post p)
                               
	 throws IOException {
            Post post = new Post(p.getTitolo(),p.getAutore(),p.getDataOra(),p.getTesto());
            Dao.getPostDao().insertPost(post);
            // Qui si può eseguire il caricamento su database...
		
	}
}
