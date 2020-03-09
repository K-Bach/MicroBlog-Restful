package bachir.microblog.restful.domain;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


/**
 * @author Bachir_Karim
 */
@Entity
public class Post
{

    @Id
    @GeneratedValue
    private Long id;

    @Basic
    private String titolo;

    @Basic
    private String autore;

    @Basic
    private String dataOra;

    @Basic
    private String testo;

    public Post()
    {
    }

    public Post( String titolo, String autore, String dataOra, String testo )
    {
        this.titolo = titolo;
        this.autore = autore;
        this.dataOra = dataOra;
        this.testo = testo;
    }

    public Long getId()
    {
        return id;
    }

    public void setId( Long id )
    {
        this.id = id;
    }

    public String getTitolo()
    {
        return titolo;
    }

    public void setTitolo( String titolo )
    {
        this.titolo = titolo;
    }

    public String getAutore()
    {
        return autore;
    }

    public void setAutore( String autore )
    {
        this.autore = autore;
    }

    public String getDataOra()
    {
        return dataOra;
    }

    public void setDataOra( String dataOra )
    {
        this.dataOra = dataOra;
    }

    public String getTesto()
    {
        return testo;
    }

    public void setTesto( String testo )
    {
        this.testo = testo;
    }

}
